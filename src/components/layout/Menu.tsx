import React from 'react';
import { Menubar } from 'primereact/menubar';
import UserMenu from './UserMenu';
import { push } from 'connected-react-router';
import { store } from '../../store/store';

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      store.dispatch(push('/'));
    },
  },
  {
    label: '2',
    icon: 'pi pi-fw pi-pencil',
  },
  {
    label: '3',
    icon: 'pi pi-fw pi-calendar',
  },
  {
    label: '4',
    icon: 'pi pi-fw pi-power-off',
  },
];

const Menu = () => {
  return <Menubar model={items} end={<UserMenu />} />;
};

export default Menu;
