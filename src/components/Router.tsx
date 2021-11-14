import { Route, Switch } from 'react-router-dom';
import { Routes } from '../config/routes';
import Home from '../features/home/Home';

const Router: React.FC = () => {
  return (
    <Switch>
      {Routes.ROUTES.map(({ path, component: Component }: Routes.Route) => (
        <Route exact path={path} render={() => <Component />} />
      ))}

      <Route render={() => <Home />} />
    </Switch>
  );
};

export default Router;
