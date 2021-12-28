import { getEmptyPageResult, http, QueryFields, notify } from 'utils';

async function fetchPageUserList({
  page = 0,
  pageSize = 10,
  search,
  gender,
  status,
  fullname,
  enterpriseName,
  roleName,
  orderBy,
  order,
}: UserListPageQueryParams) {
  const fields = new QueryFields()
    .add('id')
    .add('login')
    .setLike('fullName', fullname)
    .setLike('enterpriseName', enterpriseName)
    .setLike('positionName', roleName)
    .setEqual(
      'isBanned',
      (status === 'blocked' && 'true') || (status === 'active' && 'false') || undefined
    );

  // if (orderBy === 'fullname') fields.orderBy('fullName', order);
  // else if (orderBy === 'gender') fields.subfields('attributes').orderBy('gender', order);
  // else if (orderBy === 'citizenship') fields.subfields('attributes').orderBy('citizenship', order);
  // else if (orderBy === 'position') fields.subfields('profession').orderBy('displayName', order);
  // else if (orderBy === 'enterprise') fields.subfields('enterprise').orderBy('displayName', order);
  // else if (orderBy === 'constructionSite') fields.subfields('builds').orderBy('name', order);

  const { result }: QueryablePageResponse<UserListItemDTO> = await http.get(
    '/api/kbi/users',
    {
      pageSize,
      pageNumber: page + 1,
      search: search && '~' + search,
      fields,
    },
    { onError: () => notify.error('Не удалось получить список пользователей') }
  );
  return result || getEmptyPageResult();
}

export default fetchPageUserList;
