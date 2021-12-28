import { http, notify } from 'utils';

async function deleteUser(id: string) {
  await http.delete(`/api/kbi/users?id=${id}`, {
    onSuccess: () => notify.success('Пользователь успешно удалено'),
    onError: () => notify.error('Не удалось удалить пользователя'),
  });
}

export default deleteUser;
