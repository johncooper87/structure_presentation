import { http, notify } from 'utils';

async function deleteSiteIndoorZone(id: string) {
  await http.delete(`/api/indoor/mappictures/delete?indoorZoneId=${id}`, {
    onSuccess: () => notify.success('Помещение успешно удалено'),
    onError: () => notify.error('Не удалось удалить помещение'),
  });
}

export default deleteSiteIndoorZone;
