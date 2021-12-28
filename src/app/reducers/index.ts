import { combineReducers, Reducer } from 'redux';

import deviceListPage from './deviceListPage';
import layout from './layout';
import dashboard from './dashboard';
import expand from './expand';
import select from './select';
import auth from './auth';
import print from './print';

const reducers = {
  auth,
  layout,
  deviceListPage,
  dashboard,
  expand,
  select,
  print,
} as const;

type Reducers = typeof reducers;
type AppAction = Parameters<Reducers[keyof Reducers]>[1];

const rootReducer = combineReducers(reducers);

declare global {
  type AppState = Parameters<typeof rootReducer>[0];
}

export default rootReducer as Reducer<AppState, AppAction>;
