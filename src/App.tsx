import 'primereact/resources/themes/vela-blue/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import Menu from './components/layout/Menu';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store/store';
import { useProfile } from './hooks/useUser';
import { ThemeContextProvider } from './context/ThemeContext';
import Router from './components/Router';
import ToastContainer from './context/ToastContainer';

const App: React.FC = () => {
  useProfile();

  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <ToastContainer />
        <Menu />
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>
    </ThemeContextProvider>
  );
};

export default App;
