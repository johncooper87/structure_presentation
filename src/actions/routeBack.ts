import { matchPath } from 'react-router-dom';
import { history } from 'app';

export function routeBack() {
  const { routeBackLocation } = history.location.state || {};
  if (routeBackLocation != null) {
    const { pathname, search } = routeBackLocation;
    history.push(pathname + search);
  } else {
    const match = matchPath(history.location.pathname, {
      path: '*/:param',
    });
    const prevPath = match.params[0];
    if (prevPath != null) history.push(prevPath);
  }
}

export default routeBack;
