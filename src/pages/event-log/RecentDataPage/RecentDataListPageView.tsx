import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import RecentDataListItem from './RecentDataListItem';
import fetchPageRecentDataList from './fetchPageRecentDataList';

const RecentDataListPageView = () => {
  const {
    page = 0,
    pageSize = 10,
    ...requestParams
  } = useQueryParams() as RecentDataListPageQueryParams;
  const { data, isFetching, isLoading } = useQuery(
    ['EVENT_LOG/RECENT_DATA', requestParams],
    () => fetchPageRecentDataList(requestParams),
    {
      enabled: Object.keys(requestParams).length > 0,
    }
  );

  const recentData = useMemo(() => {
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
          {recentData?.map((recentDataItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <RecentDataListItem key={index} data={recentDataItem} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={data?.length} />
    </>
  );
};

export default RecentDataListPageView;
