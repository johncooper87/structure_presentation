import { store } from 'app';

export function openDialog(key: string, data?: any) {
  store.dispatch({
    type: 'OPEN_DIALOG',
    key,
    data,
  });
}

export function closeDialog() {
  store.dispatch({ type: 'CLOSE_DIALOG' });
}
