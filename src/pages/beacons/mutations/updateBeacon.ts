import { http, notify } from 'utils';

async function updateBeacon(
  id: string,
  { values: { latitude, longitude, major, minor, ...values } }: BeaconSubmitData
) {
  const body: BeaconPostBody = {
    ...values,
    latitude: Number(latitude),
    longitude: Number(longitude),
    major: Number(major),
    minor: Number(minor),
  };
  await http.put('/api/indoor/beacons/edit?id=' + id, body, {
    onSuccess: () => notify.success('Информация о маяке успешно обновлена'),
    onError: () => notify.error('Не удалось обновить информацию о маяке'),
  });
}

export default updateBeacon;
