import {AuthData, RoleBean} from '@data';
import {getIsLogin, getUserInfo, getUserRoles} from '@features';
import {useMemo} from 'react';
import {shallowEqual, useSelector} from 'react-redux';

export const useAuthStatus = () => {
  return useSelector(getIsLogin, shallowEqual);
};

export const useUserId = (): string | undefined => {
  const user = useUserInfo();
  return user?.id?.toString();
};
export const useUserInfo = (): AuthData | undefined => {
  return useSelector(getUserInfo, shallowEqual);
};

export const useUserRoles = (): RoleBean[] => {
  return useSelector(getUserRoles, shallowEqual);
};

export const useHasRole = () => {
  const userInfo = useUserInfo();
  const {roles} = userInfo || {};
  const slugs = useMemo(
    () => roles?.map(role => String(role.slug).toLowerCase()) || [],
    [roles],
  );
  const hasRole = (names: string[]) => {
    return names.some(name => slugs.includes(name));
  };
  return hasRole;
};
