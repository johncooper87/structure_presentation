import { http, notify } from 'utils';

async function deleteWorker(id: string) {
  await http.delete(`/api/kbi/workers/${id}`, {
    onSuccess: () => notify.success('Сотрудник успешно удалено'),
    onError: () => notify.error('Не удалось удалить сотрудника'),
  });
}

export default deleteWorker;
