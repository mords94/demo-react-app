import { getAuthorizationToken } from '../utils/jwt';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { User } from '../api/dto/User';
import { OptionalClass } from '../utils/types';
import { loadProfile } from '../features/login/loginSlice';
import { useEffectOnce } from 'react-use';

const useIsProfileLoading = (): boolean =>
  useAppSelector((state) => state.login.loading);

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

export { useProfile, useIsProfileLoading };
