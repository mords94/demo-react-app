import { Menu } from 'primereact/menu';
import React from 'react';
import { history } from '../../../store/root';

interface SideMenuProps {}

const items = [
  {
    label: 'Dashboard',
    icon: 'pi pi-fw pi-desktop',
    command: () => {
      history.push('/dashboard');
    },
  },
];

const SideMenu: React.FC<SideMenuProps> = () => {
  return <Menu model={items} className="side-menu" />;
};

export default SideMenu;
