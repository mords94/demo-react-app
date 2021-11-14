import { FunctionComponent } from 'hoist-non-react-statics/node_modules/@types/react';
import Dashboard from '../features/dashboard/Dashboard';
import Home from '../features/home/Home';
import Profile from '../features/profile/Profile';
import NewVisit from '../features/visit/NewVisit';

export namespace Routes {
  export interface Route {
    component: FunctionComponent;
    path: string;
  }

  export const ROUTES: Route[] = [
    { component: Home, path: '/' },
    { component: Profile, path: '/profile' },
    { component: NewVisit, path: '/new-visit' },
    { component: Dashboard, path: '/dashboard' },
  ];
}
