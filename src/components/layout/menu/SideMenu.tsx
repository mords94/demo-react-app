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
  {
    label: 'Places',
    icon: 'pi pi-fw pi-map',
    command: () => {
      history.push('/places');
    },
  },
  {
    label: 'Guests',
    icon: 'pi pi-fw pi-user',
    command: () => {
      history.push('/guests');
    },
  },
  {
    label: 'Visits',
    icon: 'pi pi-fw pi-map-marker',
    command: () => {
      history.push('/visits');
    },
  },
];

const SideMenu: React.FC<SideMenuProps> = () => {
  return <Menu model={items} className="side-menu" />;
};

export default SideMenu;
