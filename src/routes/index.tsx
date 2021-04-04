import { Switch } from 'react-router-dom';

import Route from './Route';

import Header from '../components/Header';
import { Home } from '../pages/Home';
import { NewAd } from '../pages/NewAd';

export function Routes() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new" component={NewAd} />
      </Switch>
    </>
  );
}

export default Routes;
