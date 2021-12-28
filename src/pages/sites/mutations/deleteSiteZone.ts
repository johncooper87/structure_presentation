import { http, notify } from 'utils';

async function deleteSiteZone(id: string) {
  await http.delete(`/api/kbi/construction-site-zone/${id}`, {
    onSuccess: () => notify.success('Зона успешно удалена'),
    onError: () => notify.error('Не удалось удалить зону'),
  });
}

export default deleteSiteZone;
