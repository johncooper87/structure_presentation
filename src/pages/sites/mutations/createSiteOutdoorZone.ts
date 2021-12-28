import { http, notify } from 'utils';
import { toColorArray } from 'utils/zoneToPolygon';

async function createSiteOutdoorZone(
  constructionSiteId: string,
  { values }: SiteOutdoorZoneSubmitData
) {
  const { name, color, features } = values;
  const body: SiteOutdoorZonePostBody = {
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

  await http.post('/api/kbi/construction-site-zone/', body, {
    onSuccess: () => notify.success('Зона успешно добавлена'),
    onError: () => notify.error('Не удалось добавить зону'),
  });
}

export default createSiteOutdoorZone;
