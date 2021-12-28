import { getEmptyPageResult, http, QueryFields, notify } from 'utils';

async function fetchPageSiteList({
  page = 0,
  pageSize = 10,
  search,
  status,
  name,
  enterpriseId,
  address,
  orderBy,
  order,
}: SiteListPageQueryParams) {
  const fields = new QueryFields()
    .expand('enterprise', new QueryFields().add('id').add('name'))
    .expand(
      'zoneGroup',
      new QueryFields()
        .add('id')
        .expand('parent', new QueryFields().add('name'))
        .expand(
          'attributes',
          new QueryFields()
            .add('sigurObject')
            .setLike('addr', address)
            .setEqual(
              'status',
              (status == null && 'True') || (status === 'archive' && 'False') || undefined
            )
            .setLike('enterpriseId', enterpriseId)
        )
        .setLike('name', name)
    );
  // if (orderBy === 'name') fields.subfields('site').orderBy('name', order);
  // else if (orderBy === 'address')
  //   fields.subfields('site').subfields('attributes').orderBy('addr', order);
  // else if (orderBy === 'totalSites') fields.orderBy('objCount', order);
  // else if (orderBy === 'totalWorkers') fields.orderBy('workerCount', order);

  const { result }: QueryablePageResponse<SiteDTO> = await http.get(
    '/api/kbi/construction-site',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      searchFields: search && 'zoneGroup.name,zoneGroup.parent.name,zoneGroup.attributes.addr',
      fields,
    },
    { onError: () => notify.error('Не удалось получить список объектов') }
  );
  return result || getEmptyPageResult();
}

export default fetchPageSiteList;
