import { getEmptyPageResult, http, QueryFields, notify } from 'utils';
import swapLatLng from 'utils/swapLatLng';

async function fetchPageAlertList({
  page = 0,
  pageSize = 10,
  search,
  status,
  workerName, // enterpriseId, constructionSiteId, orderBy, order,
  enterpriseName,
  siteName,
}: AlertListPageQueryParams) {
  const fields = new QueryFields()
    .add('alertId')
    .add('dateAlert')
    .add('location')
    .add('comment')
    .add('indoorZoneId')
    .add('alertType')
    .expand(
      'zones',
      new QueryFields()
        .add('deleted')
        .add('name')
        .add('color')
        .expand('states', new QueryFields().add('points').add('deleted'))
    )
    .setEqual(
      'isLooked',
      (status === 'unresponded' && 'false') || (status === 'responded' && 'true') || undefined
    )
    .setLike('workerFullName', workerName)
    .setLike('zoneGroupName', siteName) // .expand('enterprise', new QueryFields().add('displayName').setEqual('id', enterpriseId))
    .setLike('enterpriseName', enterpriseName); // .expand('constructionSites', new QueryFields().add('name').setEqual('id', constructionSiteId));

  // if (orderBy === 'serialNumber') fields.orderBy('gpsAddr', order);
  // else if (orderBy === 'worker') fields.subfields('worker').orderBy('fullName', order);
  // else if (orderBy === 'enterprise') fields.subfields('enterprise').orderBy('displayName', order);

  const { result }: QueryablePageResponse<AlertDTO> = await http.get(
    'api/kbi/alert',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      fields,
    },
    { onError: () => notify.error('Не удалось получить список тревог') }
  );

  const data = result.data.map(alert => ({
    ...alert,
    location: swapLatLng(alert.location),
    zones: alert.zones
      .filter(zone => !zone.deleted)
      .map(zone => ({
        ...zone,
        states: zone.states
          .filter(state => !state.deleted)
          .map(state => ({
            ...state,
            points: state.points.map(swapLatLng),
          })),
      })),
  }));

  return { ...result, data } || getEmptyPageResult();
}

export default fetchPageAlertList;
