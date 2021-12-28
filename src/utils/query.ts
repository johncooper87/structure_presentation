import qs from 'query-string';
import { history } from 'app';

export function updateQueryParams(params: QueryParams, replaceHistoryEntry = false) {
  const queryParams = {
    ...qs.parse(location.search),
    ...params,
  };
  const state = {
    pathname: location.pathname,
    search: qs.stringify(queryParams, {
      skipNull: true,
      skipEmptyString: true,
    }),
  };
  if (replaceHistoryEntry) history.replace(state);
  else history.push(state);
}

export function getQueryParams() {
  const { search } = history.location;
  return qs.parse(search, {
    parseNumbers: true,
    parseBooleans: true,
  });
}
