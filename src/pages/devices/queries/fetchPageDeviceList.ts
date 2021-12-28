import { getEmptyPageResult, http, QueryFields, notify } from 'utils';

async function fetchPageDeviceList({
  page = 0,
  pageSize = 10,
  search,
  status,
  type,
  attached,
  serialNumber,
  workerName,
  enterpriseId,
  constructionSiteId,
  orderBy,
  order,
}: DeviceListPageQueryParams) {
  const fields = new QueryFields()
    .add('id')
    .expand('attributes', new QueryFields().add('status'))
    .expand(
      'model',
      new QueryFields().setEqual(
        'displayName',
        (type === 'watch' && 'Часы') || (type === 'card' && 'Карта') || undefined
      )
    )
    .setLike('gpsAddr', serialNumber)
    .expand('worker', new QueryFields().add('id').setLike('fullName', workerName))
    .expand('enterprise', new QueryFields().add('displayName').setEqual('id', enterpriseId))
    .expand('constructionSites', new QueryFields().add('name').setEqual('id', constructionSiteId));

  if (attached !== undefined) {
    if (attached) fields.subfields('worker').setEqual('id', '!null');
    else fields.setEqual('worker', 'null');
  }
  if (orderBy === 'serialNumber') fields.orderBy('gpsAddr', order);
  else if (orderBy === 'worker') fields.subfields('worker').orderBy('fullName', order);
  else if (orderBy === 'enterprise') fields.subfields('enterprise').orderBy('displayName', order);

  const { result }: QueryablePageResponse<DeviceDTO> = await http.get(
    '/api/kbi/control-device/getcontroldeviceforview',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      status: status === 'any' ? undefined : status !== 'archive',
      fields,
    },
    { onError: () => notify.error('Не удалось получить список устройств') }
  );
  return result || getEmptyPageResult();
}

export default fetchPageDeviceList;
