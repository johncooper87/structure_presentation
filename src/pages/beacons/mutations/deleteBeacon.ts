import { http, notify } from 'utils';

async function deleteBeacon(id: string) {
  await http.delete(`/api/indoor/beacons/delete?beaconIdString=` + id, {
    onSuccess: () => notify.success('Маяк успешно удален'),
    onError: () => notify.error('Не удалось удалить маяк'),
  });
}

export default deleteBeacon;
