import { useQueryParams } from 'hooks';
import { updateQueryParams } from 'utils';
import Paginator from '../Paginator';

const changePage = (offset: number, limit: number) => {
  const page = Math.round(offset / limit);
  updateQueryParams({
    page: page !== 0 ? page : undefined,
    pageSize: limit !== 10 ? limit : undefined,
  });
};

interface PageQueryParams {
  page?: number;
  pageSize?: number;
}

interface QueryPaginatorProps {
  total: number;
}

function QueryPaginator({ total }: QueryPaginatorProps) {
  const { page, pageSize }: PageQueryParams = useQueryParams();

  if (!total) return null;

  const limit = pageSize && typeof pageSize === 'number' ? pageSize : 10;
  const offset = page && typeof page === 'number' ? page * limit : 0;
  return <Paginator limit={limit} offset={offset} total={total} onChange={changePage} />;
}

export default QueryPaginator;
