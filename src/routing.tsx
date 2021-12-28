import { socket } from 'app';
import Layout from 'layout';
import NotFound from 'pages/notfound';
import SignInPage from 'pages/sigin';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { lazy } from 'utils';
import { fetchDeviceTypeList } from 'utils/device';

const Devices = lazy(() => import('./pages/devices'));
const Workers = lazy(() => import('./pages/workers'));
const Enterprises = lazy(() => import('./pages/enterprises'));
const Eventlog = lazy(() => import('./pages/event-log'));
const Analytics = lazy(() => import('./pages/analytics'));
const Alerts = lazy(() => import('./pages/alerts'));
const Admin = lazy(() => import('./pages/admin'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Sites = lazy(() => import('./pages/sites'));
const Beacons = lazy(() => import('./pages/beacons'));
const SiteAnalytics = lazy(() => import('pages/turnstiles/SiteAnalytics'));
const TemperatureReport = lazy(() => import('pages/turnstiles/TemperatureReport'));

const Routing = () => {
  const user = useSelector(({ auth }: AppState) => auth, shallowEqual);

  useEffect(() => {
    if (user) {
      fetchDeviceTypeList();
      socket.connect(user.id);
      return socket.close;
    }
  }, [user]);

  if (!user) return <SignInPage />;

  return (
    <Layout>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/enterprises" component={Enterprises} />
          <Route path="/sites" component={Sites} />
          <Route path="/workers" component={Workers} />
          <Route path="/devices" component={Devices} />
          <Route path="/beacons" component={Beacons} />
          <Route exact path="/turnstiles/site-analytics" component={SiteAnalytics} />
          <Route exact path="/turnstiles/temperature-report" component={TemperatureReport} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/event-log" component={Eventlog} />
          <Route path="/admin" component={Admin} />
          <Route path="/alerts" component={Alerts} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default Routing;
