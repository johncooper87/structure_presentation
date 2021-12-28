import { http, notify } from 'utils';

async function deleteEnterprise(id: string) {
  await http.delete(`/api/kbi/enterprises/${id}`, {
    onSuccess: () => notify.success('Компания успешно удалена'),
    onError: () => notify.error('Не удалось удалить компанию'),
  });
}

export default deleteEnterprise;
