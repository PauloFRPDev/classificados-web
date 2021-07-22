import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import Header from '../components/Header';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  // eslint-disable-next-line react/require-default-props
  isPrivate?: boolean;
  component: React.ComponentType;
}

export default function Route({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        function RenderedComponent() {
          if (!location.pathname.includes('/admin')) {
            return (
              <>
                <Header />
                <Component />
              </>
            );
          }
          return <Component />;
        }

        return isPrivate === !!user ? (
          <RenderedComponent />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/admin/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
