import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import { Home } from '../pages/Home';
import { NewAd } from '../pages/NewAd';
import { ListAds } from '../pages/ListAds';

import { SignIn } from '../pages/Admin/SignIn';
import { Dashboard } from '../pages/Admin/Dashboard';

export function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new" component={NewAd} />
          <Route path="/list" component={ListAds} />

          <Route path="/admin" exact component={SignIn} />
          <Route path="/admin/dashboard" component={Dashboard} isPrivate />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;
