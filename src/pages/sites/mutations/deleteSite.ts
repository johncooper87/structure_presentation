import { http, notify } from 'utils';

async function deleteSite(id: string) {
  await http.delete(`/api/kbi/construction-site/${id}`, {
    onSuccess: () => notify.success('Объект успешно удален'),
    onError: () => notify.error('Не удалось удалить объект'),
  });
}

export default deleteSite;
