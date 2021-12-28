import { http, notify } from 'utils';

async function fetchPageBeacon(id: string) {
  const beacon: Beacon = await http.get(
    `/api/indoor/beacons/get/${id}`,
    {},
    { onError: () => notify.error('Не удалось получить информацию о маяке') }
  );

  const indoorZone = (await http.get(
    '/api/indoor/mappictures/' + beacon.indoorZoneId
  )) as SiteIndoorZone;

  return {
    ...beacon,
    siteId: indoorZone.constructionSiteId,
  } as Beacon & { siteId: string };
}

export default fetchPageBeacon;
