import { RoleType } from '../api/dto/User';
import { useProfile } from './useProfile';

const useRole = (): RoleType => {
  const user = useProfile();

  if (user.isPresent()) {
    return RoleType[user.get().role.roleType];
  }

  return RoleType.ROLE_GUEST;
};

const useIsAdmin = (): boolean => useRole() === RoleType.ROLE_ADMIN;
const useIsOwner = (): boolean => useRole() === RoleType.ROLE_OWNER;
const useIsGuest = (): boolean => useRole() === RoleType.ROLE_GUEST;

export { useRole, useIsAdmin, useIsOwner, useIsGuest };
