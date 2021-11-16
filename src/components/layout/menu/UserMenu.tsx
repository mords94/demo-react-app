import { push } from 'connected-react-router';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useCallback, useRef } from 'react';
import { useReduxEffect } from 'use-redux-effect';
import { InputSwitch } from 'primereact/inputswitch';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import LoginDialog from '../../../features/login/LoginDialog';
import {
  signedIn,
  signIn,
  signInError,
  signOut,
} from '../../../features/login/loginSlice';
import { DialogMethods } from '../../common/Dialog';
import RoundedButton from '../../common/RoundedButton';
import { useTheme } from '../../../context/ThemeContext';

const UserMenu = () => {
  const menu = useRef<Menu>(null);
  const loginDialog = useRef<DialogMethods>(null);
  const { loading, user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const { toggleTheme, isDark } = useTheme();

  const toggleLoginDialogCommand = useCallback(() => {
    loginDialog.current?.toggle();
  }, []);

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const navigateToProfile = useCallback(() => {
    dispatch(push('/profile'));
  }, [dispatch]);

  useReduxEffect(
    () => {
      loginDialog.current?.close();
    },
    [signIn.toString()],
    [loginDialog]
  );

  useReduxEffect(
    () => {
      loginDialog.current?.open();
    },
    [signInError.toString()],
    [loginDialog]
  );

  const loggedInItems = useCallback(
    (): MenuItem[] => [
      {
        label: `Hey, ${user.get().personDetails.firstName} ${
          user.get().personDetails.lastName
        }`,
        command: navigateToProfile,
      },
      { separator: true },
      {
        label: `Profile`,
        command: navigateToProfile,
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: logout,
      },
    ],
    [logout, navigateToProfile, user]
  );

  const loggedOutItems = [
    {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      command: toggleLoginDialogCommand,
    },
  ];

  const items = user.isPresent() ? loggedInItems() : loggedOutItems;

  return (
    <div className="mr-4">
      <InputSwitch
        checked={isDark}
        onChange={toggleTheme}
        className="mx-3"
        tooltip="Toggle dark mode"
        tooltipOptions={{ position: 'left' }}
      />
      <LoginDialog ref={loginDialog} />
      <Menu model={items} popup ref={menu} />
      <RoundedButton
        icon="pi pi-user"
        loading={loading}
        onClick={(event) => menu.current?.toggle(event)}
        raised={user.isPresent()}
      />
    </div>
  );
};

export default UserMenu;
