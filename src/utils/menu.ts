import { store } from 'app';

export function openMenu(key: string, anchorEl: Element, data?: any) {
  store.dispatch({
    type: 'OPEN_MENU',
    key,
    anchorEl,
    data,
  });
}

export function getMenuData<Data>() {
  return store.getState().layout.menu.data as Data;
}
