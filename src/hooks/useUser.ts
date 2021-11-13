import { getAuthorizationToken } from '../utils/jwt';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RoleType, User } from '../api/dto/User';
import { OptionalClass } from '../utils/types';
import { loadProfile } from '../features/login/loginSlice';
import { useEffectOnce } from 'react-use';

const useProfile = (): OptionalClass<User> => {
  const token = getAuthorizationToken();
  const { user, loading } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    if (token.isPresent() && !user.isPresent() && !loading) {
      dispatch(loadProfile());
    }
  });

  return user;
};

const useRole = (): RoleType => {
  const user = useProfile();

  if (user.isPresent()) {
    return RoleType[user.get().role.roleType];
  }

  return RoleType.ROLE_GUEST;
};

export { useProfile, useRole };
