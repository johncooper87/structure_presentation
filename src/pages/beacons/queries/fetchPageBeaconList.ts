import { http, notify } from 'utils';

async function fetchPageBeaconList({ siteId }: BeaconListPageQueryParams) {
  const result: Beacon[] = await http.get(
    'api/indoor/beacons/getby%D1%81siteid',
    {
      сonstructionSiteId: siteId,
    },
    { onError: () => notify.error('Не удалось получить список маяков') }
  );
  return result;
}

export default fetchPageBeaconList;
