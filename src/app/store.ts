import { createStore } from 'redux';
import rootReducer from './reducers';

const devTools =
  process.env.NODE_ENV !== 'production'
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    : undefined;

const store = createStore(rootReducer, devTools?.());

export default store;

const currentLayout = store.getState().layout;
store.subscribe(() => {
  const newLayout = store.getState().layout;
  if (currentLayout.leftbarOpen !== newLayout.leftbarOpen) {
    localStorage.setItem('leftbarOpen', newLayout.leftbarOpen.toString());
    currentLayout.leftbarOpen = newLayout.leftbarOpen;
  }
  if (currentLayout.rightbarOpen !== newLayout.rightbarOpen) {
    localStorage.setItem('rightbarOpen', newLayout.rightbarOpen.toString());
    currentLayout.rightbarOpen = newLayout.rightbarOpen;
  }
});
