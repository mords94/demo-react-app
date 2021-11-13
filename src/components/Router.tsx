import { Route, Switch } from 'react-router-dom';
import Home from '../features/home/Home';
import Profile from '../features/profile/Profile';
import NewVisit from '../features/visit/NewVisit';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/profile" render={() => <Profile />} />
      <Route exact path="/new-visit" render={() => <NewVisit />} />
      <Route render={() => <div>Miss</div>} />
    </Switch>
  );
};

export default Router;
