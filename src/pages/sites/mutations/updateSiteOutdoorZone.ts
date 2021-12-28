import { http, notify } from 'utils';
import { toColorArray } from 'utils/zoneToPolygon';

async function updateSiteOutdoorZone(
  constructionSiteId: string,
  id: string,
  { values }: SiteOutdoorZoneSubmitData
) {
  const { name, color, features } = values;
  const body: SiteOutdoorZonePutBody = {
    name,
    color: toColorArray(color),
    constructionSiteId,
    type: 'polygon',
    role: 0,
    state: {
      dateCreate: new Date().toISOString(),
      type: 1,
      points: features.polygons[0]?.latlngs.map(latlng => latlng.reverse()) as LngLat[],
    },
  };

  await http.put(`/api/kbi/construction-site-zone/${id}`, body, {
    onSuccess: () => notify.success('Зона успешно обновлена'),
    onError: () => notify.error('Не удалось обновить зону'),
  });
}

export default updateSiteOutdoorZone;
