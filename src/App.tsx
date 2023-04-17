import {
  ErrorBoundary,
  LoadingOverlay,
  UnloadEventHandler,
  UserNotifyHandle,
} from '@pagopa/selfcare-common-frontend';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home/Home';
import QrCode from './pages/QrCode/QrCode';

const App = () => (
  <ErrorBoundary>
    <LoadingOverlay />
    <UserNotifyHandle />
    <UnloadEventHandler />
    <Switch>
      <Route path={routes.PAYMENT_QR_CODE}>
        <QrCode />
      </Route>
      <Route path={routes.HOME}>
        <Home />
      </Route>
      <Route path="*">
        <Redirect to={routes.HOME} />
      </Route>
    </Switch>
  </ErrorBoundary>
);

export default App;
