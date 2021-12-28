import { http, notify } from 'utils';

async function createBeacon({
  values: { latitude, longitude, major, minor, ...values },
}: BeaconSubmitData) {
  const body: BeaconPostBody = {
    ...values,
    latitude: Number(latitude),
    longitude: Number(longitude),
    major: Number(major),
    minor: Number(minor),
  };
  await http.post('/api/indoor/beacons/insert', body, {
    onSuccess: () => notify.success('Маяк успешно добавлен'),
    onError: () => notify.error('Не удалось добавить маяк'),
  });
}

export default createBeacon;
