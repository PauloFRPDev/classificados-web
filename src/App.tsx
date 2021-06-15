import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyles from './styles/global';

import Routes from './routes';

import AppProvider from './hooks';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyles />
    </Router>
  );
}

export default App;
