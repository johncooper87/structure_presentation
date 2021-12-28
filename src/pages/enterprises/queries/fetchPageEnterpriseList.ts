import { getEmptyPageResult, http, QueryFields, notify } from 'utils';

async function fetchPageEnterpriseList({
  page = 0,
  pageSize = 10,
  search,
  status,
  name,
  address,
  orderBy,
  order,
}: EnterpriseListPageQueryParams) {
  const fields = new QueryFields()
    .add('objCount')
    .add('workerCount')
    .expand(
      'enterprise',
      new QueryFields()
        .add('id')
        .expand(
          'attributes',
          new QueryFields()
            .add('inn')
            .setLike('addr', address)
            .setEqual(
              'status',
              (status == null && 'True') || (status === 'archive' && 'False') || undefined
            )
        )
        .setLike('name', name)
    );
  if (orderBy === 'name') fields.subfields('enterprise').orderBy('name', order);
  else if (orderBy === 'address') fields.subfields('enterprise').subfields('attributes').orderBy('addr', order);
  else if (orderBy === 'totalSites') fields.orderBy('objCount', order);
  else if (orderBy === 'totalWorkers') fields.orderBy('workerCount', order);

  const { result }: QueryablePageResponse<EnterpriseDTO> = await http.get(
    '/api/kbi/enterprises',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      searchFields: search && 'enterprise.name,enterprise.attributes.addr,enterprise.attributes.inn',
      fields,
    },
    { onError: () => notify.error('Не удалось получить список компаний') }
  );
  return result || getEmptyPageResult();
}

export default fetchPageEnterpriseList;
