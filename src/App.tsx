import 'primereact/resources/themes/vela-blue/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/store';
import { useProfile } from './hooks/useProfile';
import { ThemeContextProvider } from './context/ThemeContext';
import Router from './components/Router';

const App: React.FC = () => {
  useProfile();

  return (
    <ThemeContextProvider>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </ThemeContextProvider>
  );
};

export default App;
