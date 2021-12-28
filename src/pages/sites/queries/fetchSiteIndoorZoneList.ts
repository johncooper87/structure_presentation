import { http, notify } from 'utils';

async function fetchSiteIndoorZoneList(id: string) {
  const result = await http.get(
    `/api/indoor/mappictures/getbycsiteid?%D1%81onstructionSiteId=${id}`,
    {},
    { onError: () => notify.error('Не удалось получить помещения объекта') }
  );
  return result as SiteIndoorZone[];
}

export default fetchSiteIndoorZoneList;
