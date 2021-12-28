import { getEmptyPageResult, http, QueryFields, notify } from 'utils';

async function fetchPageWorkerList({
  page = 0,
  pageSize = 10,
  search,
  gender,
  citizenship,
  positionId,
  insuranceNumber,
  fullname,
  enterpriseId,
  constructionSiteId,
  orderBy,
  order,
}: WorkerListPageQueryParams) {
  const fields = new QueryFields()
    .add('id')
    .expand(
      'attributes',
      new QueryFields()
        .add('photo')
        .setEqual('gender', (gender === 'male' && '0') || (gender === 'female' && '1') || undefined)
        .setEqual('citizenship', citizenship)
        .setLike('insurance', insuranceNumber?.replace(/X/g, '').replace(/--/g, '-'))
    )
    .expand('profession', new QueryFields().setEqual('id', positionId).add('displayName'))
    .setLike('fullname', fullname)
    .expand(
      'device',
      new QueryFields().add('id').add('name').expand('model', new QueryFields().add('displayName'))
    )
    .expand('enterprise', new QueryFields().add('displayName').setEqual('id', enterpriseId))
    .expand('builds', new QueryFields().add('name').setEqual('id', constructionSiteId));

  if (orderBy === 'fullname') fields.orderBy('fullName', order);
  else if (orderBy === 'gender') fields.subfields('attributes').orderBy('gender', order);
  else if (orderBy === 'citizenship') fields.subfields('attributes').orderBy('citizenship', order);
  else if (orderBy === 'position') fields.subfields('profession').orderBy('displayName', order);
  else if (orderBy === 'enterprise') fields.subfields('enterprise').orderBy('displayName', order);
  else if (orderBy === 'constructionSite') fields.subfields('builds').orderBy('name', order);

  const { result }: QueryablePageResponse<WorkerDTO> = await http.get(
    '/api/kbi/workers',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      fields,
    },
    { onError: () => notify.error('Не удалось получить список сотрудников') }
  );
  return result || getEmptyPageResult();
}

export default fetchPageWorkerList;
