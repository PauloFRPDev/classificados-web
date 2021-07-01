import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Header from '../components/Header';

import { Home } from '../pages/Home';
import { NewAd } from '../pages/NewAd';
import { ListAds } from '../pages/ListAds';

export function Routes() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" component={NewAd} />
        <Route path="/list" component={ListAds} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
