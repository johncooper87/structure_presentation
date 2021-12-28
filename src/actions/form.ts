import { matchPath } from 'react-router-dom';
import { history } from 'app';

export function routeToCreatePage() {
  const creationPagePath = history.location.pathname + '/create';
  history.push(creationPagePath, { routeBackLocation: history.location });
}

export function finishPageCreateMode() {
  const { pathname } = history.location;
  const match = matchPath<[string]>(pathname, { path: '*/create' });
  const listPagePath = match?.params[0];
  history.push(listPagePath);
}

export function setPageToEditMode() {
  const { pathname, state } = history.location;
  const editPagePath = pathname + '/edit';
  history.replace(editPagePath, state);
}

export function cancelPageEditMode(event?: React.MouseEvent<Element, MouseEvent>) {
  if ((event?.nativeEvent || event) instanceof MouseEvent) {
    event.target.dispatchEvent(new Event('reset', { bubbles: true }));
  }
  const { pathname, state } = history.location;
  const match = matchPath<[string]>(pathname, { path: '*/edit' });
  const readingPagePath = match?.params[0];
  history.replace(readingPagePath, state);
}
