import {RoleBean} from '@data';

export const checkRole = (roles: RoleBean[], names: string[]) => {
  const slugs = roles?.map(role => String(role.slug).toLowerCase()) || [];
  return names.some(el => slugs.includes(el));
};
