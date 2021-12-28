import { store } from 'app';

function closeMenu() {
  store.dispatch({ type: 'CLOSE_MENU' });
}

export default closeMenu;
