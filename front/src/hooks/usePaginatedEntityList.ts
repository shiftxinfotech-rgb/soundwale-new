import {Meta, PaginationParams} from '@data';
import {useFocusEffect} from '@react-navigation/native';
import {createEntityAdapter, EntityState} from '@reduxjs/toolkit';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

type LoadMode = 'initial' | 'refresh' | 'loadMore';

export type LazyFetcherEntity<T> = ((params: PaginationParams) => Promise<{
  data?: T[];
  meta?: Meta;
}>) & {
  abort?: () => void;
};

type UsePaginatedEntityListOptions<T extends {id: string | number}> = {
  initialPage?: number;
  pageSize?: number;
  extraParams?: Record<string, any>;
  autoRefreshOnParamsChange?: boolean;
  debounceDelay?: number;
  onError?: (err: unknown) => void;
  refreshOnFocus?: boolean;
  sortComparer?: ((a: T, b: T) => number) | false;
};

export type UsePaginatedEntityListReturn<T extends {id: string | number}> = {
  data: T[];
  isLoading: boolean;
  isRefreshing: boolean;
  isFetchingMore: boolean;
  refresh: () => void;
  loadNextPage: () => void;
  hasMore: boolean;
  meta: Meta | undefined;
  addOne: (item: T) => void;
  updateOne: (id: string | number, changes: Partial<T>) => void;
  removeOne: (id: string | number) => void;
  getOne: (id: string | number) => T | undefined;
  updateNestedOne: (
    id: string | number,
    changes: Partial<T>,
    childrenKey?: keyof T,
  ) => void;
  removeNestedOne: (id: string | number, childrenKey?: keyof T) => void;
  getNestedOne: (id: string | number, childrenKey?: keyof T) => T | undefined;
  forceRefresh: () => void;
};

function deepUpdateEntity<T extends Record<string, any>>(
  list: T[],
  id: string | number,
  changes: Partial<T>,
  childrenKey: keyof T = 'replies' as keyof T,
): T[] {
  return list.map(item => {
    if (item.id === id) {
      return {...item, ...changes};
    }
    const children = item[childrenKey];
    if (Array.isArray(children) && children.length) {
      const updatedChildren = deepUpdateEntity(
        children,
        id,
        changes,
        childrenKey,
      );
      if (updatedChildren !== children) {
        return {...item, [childrenKey]: updatedChildren};
      }
    }

    return item;
  });
}

function deepRemoveEntity<T extends Record<string, any>>(
  list: T[],
  id: string | number,
  childrenKey: keyof T = 'replies' as keyof T,
): T[] {
  let changed = false;

  const result = list
    .map(item => {
      if (item.id === id) {
        changed = true;
        return null; // remove it
      }

      const children = item[childrenKey];
      if (Array.isArray(children) && children.length) {
        const updatedChildren = deepRemoveEntity(children, id, childrenKey);
        if (updatedChildren !== children) {
          changed = true;
          return {...item, [childrenKey]: updatedChildren};
        }
      }

      return item;
    })
    .filter(Boolean) as T[];

  return changed ? result : list;
}

function deepGetEntity<T extends Record<string, any>>(
  list: T[],
  id: string | number,
  childrenKey: keyof T = 'replies' as keyof T,
): T | undefined {
  for (const item of list) {
    if (item.id === id) {
      return item;
    }
    const children = item[childrenKey];
    if (Array.isArray(children) && children.length) {
      const found = deepGetEntity(children, id, childrenKey);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

export function usePaginatedEntityList<T extends {id: string | number}>(
  fetcher: LazyFetcherEntity<T>,
  options?: UsePaginatedEntityListOptions<T>,
): UsePaginatedEntityListReturn<T> {
  const {
    initialPage = 1,
    pageSize = 10,
    extraParams = {},
    autoRefreshOnParamsChange = true,
    debounceDelay = 300,
    refreshOnFocus = true,
    onError,
    sortComparer = false,
  } = options || {};

  // --- ENTITY ADAPTER ---
  const adapter = useMemo(
    () =>
      createEntityAdapter<T>({
        sortComparer,
      }),
    [sortComparer],
  );
  const [entities, setEntities] = useState<EntityState<T, string | number>>(
    adapter.getInitialState(),
  );
  const selectors = useMemo(() => adapter.getSelectors(), [adapter]);

  // --- STATE ---
  const [page, setPage] = useState(initialPage);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // --- REFS ---
  const hasFetchedOnce = useRef(false);
  const isMounted = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevParamsRef = useRef<string>('');

  const initialPageRef = useRef(initialPage);
  const isLazyRef = useRef(typeof fetcher === 'function');
  const loadPageRef = useRef<(p: number, m: any) => void>(() => {});
  const refreshRef = useRef<() => void>(() => {});
  const fetcherRef = useRef(fetcher);
  const metaRef = useRef<Meta | undefined>(undefined);

  const isLazy = typeof fetcher === 'function';

  // --- DATA HANDLING ---
  const applyData = useCallback(
    (newData: T[], mode: LoadMode) => {
      setEntities((prev: EntityState<T, string | number>) =>
        mode === 'refresh' || mode === 'initial'
          ? adapter.setAll(prev, newData)
          : adapter.addMany(prev, newData),
      );
    },
    [adapter],
  );

  // --- LOAD PAGE ---
  const loadPage = useCallback(
    async (targetPage: number, mode: LoadMode) => {
      if (!isLazy) {
        return;
      }
      if (mode === 'refresh') {
        setIsRefreshing(true);
      }
      if (mode === 'loadMore') {
        setIsFetchingMore(true);
      }

      // Abort previous request
      fetcherRef.current.abort?.();

      try {
        console.log('[API] fetching with params:', {
          page: targetPage,
          limit: pageSize,
          ...extraParams,
        });
        const result = await fetcherRef.current({
          page: targetPage,
          limit: pageSize,
          ...extraParams,
        });

        // Check if component is still mounted before updating state
        if (!isMounted.current) {
          return;
        }

        const {data, meta} = result;
        console.log('[API] meta:', meta);
        metaRef.current = meta;
        setPage(targetPage);
        setHasMore(meta?.have_more_records ?? false);
        applyData(data ?? [], mode);
      } catch (err) {
        if (!isMounted.current) {
          return;
        }

        if (mode === 'initial' || mode === 'refresh') {
          setEntities(adapter.getInitialState());
          setHasMore(false);
        }
        onError?.(err);
      } finally {
        // Only update loading states if component is still mounted
        if (isMounted.current) {
          setIsRefreshing(false);
          setIsFetchingMore(false);
          if (mode === 'initial') {
            setIsInitialLoadComplete(true);
          }
        }
      }
    },
    [adapter, applyData, extraParams, isLazy, onError, pageSize],
  );

  // --- REFRESH ---
  const refresh = useCallback(() => {
    if (isLazy) {
      loadPage(initialPage, 'refresh');
    } else {
      setPage(initialPage);
    }
  }, [initialPage, isLazy, loadPage]);

  // --- LOAD NEXT PAGE ---
  const loadNextPage = useCallback(() => {
    if (!hasMore || isFetchingMore || !isInitialLoadComplete) {
      return;
    }

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }

    debounceTimer.current = setTimeout(() => {
      if (isLazy) {
        loadPage(page + 1, 'loadMore');
      } else {
        setPage(prev => prev + 1);
      }
      debounceTimer.current = null;
    }, debounceDelay);
  }, [
    debounceDelay,
    hasMore,
    isFetchingMore,
    isInitialLoadComplete,
    isLazy,
    loadPage,
    page,
  ]);

  useEffect(() => {
    initialPageRef.current = initialPage;
    isLazyRef.current = isLazy;
    loadPageRef.current = loadPage;
    refreshRef.current = refresh;
    fetcherRef.current = fetcher;
  }, [initialPage, isLazy, loadPage, refresh, fetcher]);

  // --- FOCUS REFRESH ---
  useFocusEffect(
    useCallback(() => {
      if (!refreshOnFocus) {
        return;
      }
      console.log('[Focus] Screen gained focus');
      if (hasFetchedOnce.current) {
        if (isLazyRef.current) {
          loadPageRef.current(initialPageRef.current, 'refresh');
        } else {
          setPage(initialPageRef.current);
        }
      }
      return () => {
        // Cleanup function
        if (fetcherRef.current.abort) {
          fetcherRef.current.abort();
        }
      };
    }, [refreshOnFocus]),
  );

  // --- INITIAL LOAD ---
  useEffect(() => {
    isMounted.current = true;
    console.log('[Mount] Component mounted');
    if (!hasFetchedOnce.current) {
      if (isLazyRef.current) {
        loadPageRef.current(initialPageRef.current, 'initial');
      } else {
        setPage(initialPageRef.current);
      }
      hasFetchedOnce.current = true;
    }

    return () => {
      isMounted.current = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // --- PARAMS CHANGE ---
  useEffect(() => {
    if (!autoRefreshOnParamsChange || !isLazy) {
      return;
    }

    const key = JSON.stringify(extraParams);
    if (prevParamsRef.current !== key) {
      prevParamsRef.current = key;
      loadPage(initialPage, 'refresh');
    }
  }, [extraParams, autoRefreshOnParamsChange, isLazy, loadPage, initialPage]);

  // --- OPTIMISTIC CRUD HELPERS ---
  const addOne = useCallback(
    (item: T) =>
      setEntities((prev: EntityState<T, string | number>) =>
        adapter.addOne(prev, item),
      ),
    [adapter],
  );
  const updateOne = useCallback(
    (id: string | number, changes: Partial<T>) =>
      setEntities((prev: EntityState<T, string | number>) => {
        if (!prev.entities[id]) {
          return prev;
        }
        return adapter.updateOne(prev, {id, changes});
      }),
    [adapter],
  );
  const removeOne = useCallback(
    (id: string | number) =>
      setEntities((prev: EntityState<T, string | number>) =>
        adapter.removeOne(prev, id),
      ),
    [adapter],
  );

  const getOne = useCallback(
    (id: string | number): T | undefined => {
      return selectors.selectById(entities, id);
    },
    [entities, selectors],
  );

  const updateNestedOne = useCallback(
    (
      id: string | number,
      changes: Partial<T>,
      childrenKey: keyof T = 'replies' as keyof T,
    ) => {
      setEntities(prev => {
        const all = selectors.selectAll(prev);
        const updated = deepUpdateEntity(all, id, changes, childrenKey);
        return adapter.setAll(prev, updated);
      });
    },
    [adapter, selectors],
  );

  const removeNestedOne = useCallback(
    (id: string | number, childrenKey: keyof T = 'replies' as keyof T) => {
      setEntities(prev => {
        const all = selectors.selectAll(prev);
        const updated = deepRemoveEntity(all, id, childrenKey);
        return adapter.setAll({...prev}, updated);
      });
    },
    [adapter, selectors],
  );

  const getNestedOne = useCallback(
    (
      id: string | number,
      childrenKey: keyof T = 'replies' as keyof T,
    ): T | undefined => {
      const all = selectors.selectAll(entities);
      return deepGetEntity(all, id, childrenKey);
    },
    [entities, selectors],
  );

  // --- DERIVE DATA ARRAY ---
  const data = useMemo(
    () => selectors.selectAll(entities),
    [entities, selectors],
  );

  const isLoading = isLazy
    ? page === initialPage && !isInitialLoadComplete
    : false;

  return {
    data,
    isLoading,
    isRefreshing,
    isFetchingMore,
    refresh,
    loadNextPage,
    hasMore,
    meta: metaRef.current,
    addOne,
    updateOne,
    removeOne,
    getOne,
    updateNestedOne,
    removeNestedOne,
    getNestedOne,
    forceRefresh: () => {
      if (isLazy) {
        loadPage(initialPage, 'refresh');
      } else {
        setPage(initialPage);
      }
    },
  };
}
