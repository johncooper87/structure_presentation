import { http, notify } from 'utils';

const fields = `zoneGroup[id,name,zones[id,name,color,deleted,states[deleted,points]]]`;

async function fetchSiteOutdoorZoneList(id: string) {
  const { result }: APIResponse<SiteDTO> = await http.get(
    `/api/kbi/construction-site/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить зоны объекта') }
  );
  return result.zoneGroup as ZoneGroup;
}

export default fetchSiteOutdoorZoneList;
