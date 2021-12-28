import { history } from 'app';

function routeForward(path: string) {
  history.push(path, { routeBackLocation: history.location });
}

export default routeForward;
