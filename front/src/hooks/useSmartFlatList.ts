import {Meta, PaginationParams} from '@data';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';

type LoadMode = 'initial' | 'refresh' | 'loadMore';

export type LazyFetcher<T> = ((params: PaginationParams) => Promise<{
  data?: T[];
  meta?: Meta;
}>) & {
  abort?: () => void;
};

type UsePaginatedListOptions = {
  initialPage?: number;
  pageSize?: number;
  keepPrevious?: boolean;
  extraParams?: Record<string, any>;
  autoRefreshOnParamsChange?: boolean;
  debounceDelay?: number;
  onError?: (err: unknown) => void;
  refreshOnFocus?: boolean;
};

export function usePaginatedList<T>(
  fetcher: LazyFetcher<T>,
  options?: UsePaginatedListOptions,
) {
  const {
    initialPage = 1,
    pageSize = 10,
    extraParams = {},
    autoRefreshOnParamsChange = true,
    debounceDelay = 300,
    refreshOnFocus = true,
  } = options || {};

  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const hasFetchedOnce = useRef(false);
  const isMounted = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevParamsRef = useRef(JSON.stringify(extraParams));

  const initialPageRef = useRef(initialPage);
  const isLazyRef = useRef(typeof fetcher === 'function');
  const loadPageRef = useRef<(p: number, m: any) => void>(() => {});
  const refreshRef = useRef<() => void>(() => {});
  const fetcherRef = useRef(fetcher);
  const metaRef = useRef<Meta | undefined>(undefined);

  const isLazy = typeof fetcher === 'function';

  const applyData = useCallback((newData: T[], mode: LoadMode) => {
    setItems(prev =>
      mode === 'refresh' || mode === 'initial'
        ? newData
        : [...prev, ...newData],
    );
  }, []);

  const loadPage = useCallback(
    async (targetPage: number, mode: LoadMode) => {
      if (!isLazy) {
        return;
      }

      console.log(`[API] Starting ${mode} fetch for page ${targetPage}`);

      if (mode === 'refresh') {
        setIsRefreshing(true);
      }
      if (mode === 'loadMore') {
        setIsFetchingMore(true);
      }

      fetcherRef.current.abort?.();

      try {
        const result = await fetcherRef.current({
          page: targetPage,
          limit: pageSize,
          ...extraParams,
        });

        console.log(
          `[API] ${mode} fetch complete - Received ${
            result.data?.length ?? 0
          } items`,
        );
        if (!isMounted.current) {
          console.log('[API] Ignoring response - Component unmounted');
          return;
        }

        const {data, meta} = result;
        console.log('[API] meta:', meta);
        metaRef.current = meta;
        setPage(targetPage);
        setHasMore(meta?.have_more_records ?? false);
        applyData(data ?? [], mode);
      } catch (err) {
        console.log('error', err);
        console.log(`[API] Error during ${mode} fetch:`, err);
        if (mode === 'initial' || mode === 'refresh') {
          console.log(`[API] Clearing items due to ${mode} error`);
          setItems([]);
          setHasMore(false);
        }
        options?.onError?.(err);
      } finally {
        console.log(`[API] Finally block executed for mode: ${mode}`);
        setIsRefreshing(false);
        setIsFetchingMore(false);
        if (mode === 'initial') {
          setIsInitialLoadComplete(true);
        }
      }
    },
    [isLazy, pageSize, extraParams, applyData, options],
  );

  const refresh = useCallback(() => {
    if (isLazy) {
      loadPage(initialPage, 'refresh');
    } else {
      setPage(initialPage);
    }
  }, [initialPage, loadPage, isLazy]);

  const loadNextPage = useCallback(() => {
    if (!hasMore || isFetchingMore || !isInitialLoadComplete) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (isLazy) {
        loadPage(page + 1, 'loadMore');
      } else {
        setPage(prev => prev + 1);
      }
    }, debounceDelay);
  }, [
    hasMore,
    isFetchingMore,
    isInitialLoadComplete,
    debounceDelay,
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

  const handleRequest = useCallback(() => {
    if (isLazyRef.current) {
      loadPageRef.current(initialPageRef.current, 'initial');
    } else {
      setPage(initialPageRef.current);
    }
  }, []);

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

  const data = isLazy ? items : [];

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
    handleRequest,
    meta: metaRef.current,
    forceRefresh: () => {
      if (isLazyRef.current) {
        loadPageRef.current(initialPageRef.current, 'refresh');
      } else {
        setPage(initialPageRef.current);
      }
    },
  };
}
