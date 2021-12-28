import { http, notify } from 'utils';

async function createSiteIndoorZone(
  constructionSiteId: string,
  { values }: SiteIndoorZoneSubmitData
) {
  const { floor, image, corners } = values;
  const body: SiteIndoorZonePostBody = {
    file: image,
    request: {
      ConstructionSiteId: constructionSiteId,
      Floor: Number(floor),
      Coordinates: corners.map(c => ({
        Latitude: c[0],
        Longitude: c[1],
      })),
    },
  };

  await http.post('/api/indoor/mappictures/insertoredit', body, {
    contentType: 'FormData',
    onSuccess: () => notify.success('Помещение успешно добавлено'),
    onError: () => notify.error('Не удалось добавить помещение'),
  });
}

export default createSiteIndoorZone;
