import { http, notify } from 'utils';

async function updateSiteIndoorZone(
  constructionSiteId: string,
  id: string,
  { values }: SiteIndoorZoneSubmitData
) {
  const { floor, image, corners } = values;
  const oldImage = typeof image === 'string' ? await (await http.get(image)).blob() : undefined;
  const body: SiteIndoorZonePutBody = {
    file: image instanceof File ? image : new File([oldImage], 'name'),
    request: {
      id,
      ConstructionSiteId: constructionSiteId,
      Floor: Number(floor),
      Coordinates: corners.map(c => ({
        Latitude: c[0],
        Longitude: c[1],
      })),
    },
  };

  await http.post(`/api/indoor/mappictures/insertoredit`, body, {
    contentType: 'FormData',
    onSuccess: () => notify.success('Помещение успешно обновлено'),
    onError: () => notify.error('Не удалось обновить помещение'),
  });
}

export default updateSiteIndoorZone;
