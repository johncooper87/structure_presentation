import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import HistoryListItem from './HistoryListItem';
import fetchPageHistoryList from './fetchPageHistoryList';

const HistoryListPageView = () => {
  const {
    page = 0,
    pageSize = 10,
    ...requestParams
  } = useQueryParams() as HistoryListPageQueryParams;
  const { data, isFetching, isLoading } = useQuery(
    ['EVENT_LOG/HISTORY', requestParams],
    () => fetchPageHistoryList(requestParams),
    {
      enabled: Object.keys(requestParams).length > 0,
    }
  );

  const history = useMemo(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  }, [data, page, pageSize]);

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {history?.map((historyItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HistoryListItem key={index} data={historyItem} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={data?.length} />
    </>
  );
};

export default HistoryListPageView;
