// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory, Location } from 'history';

declare global {
  interface LocationState {
    routeBackLocation?: Location<LocationState>;
  }
}

const history = createBrowserHistory<LocationState>();

export default history;
