import React from 'react';
import { Menubar } from 'primereact/menubar';
import UserMenu from './UserMenu';
import logo from '../../../layout/images/logo.png';
import logoDark from '../../../layout/images/logo_dark.png';
import { useTheme } from '../../../context/ThemeContext';
import { history } from '../../../store/root';

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      history.push('/');
    },
  },
  {
    label: 'Check-in',
    icon: 'pi pi-fw pi-map-marker',
    command: () => {
      history.push('/new-visit');
    },
  },
];

const Logo = () => {
  const { isDark } = useTheme();

  return (
    <img
      src={isDark ? logoDark : logo}
      alt="Logo"
      className="logo"
      onClick={() => history.push('/')}
    />
  );
};

const Menu = () => {
  return <Menubar model={items} start={<Logo />} end={<UserMenu />} />;
};

export default Menu;
