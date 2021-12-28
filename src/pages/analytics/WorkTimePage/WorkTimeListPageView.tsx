import { Typography } from '@material-ui/core';
import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import WorkTimeListItem from './WorkTimeListItem';
import fetchPageWorkTimeList from './fetchPageWorkTimeList';

const WorkTimeListPageView = () => {
  const {
    page = 0,
    pageSize = 10,
    ...requestParams
  } = useQueryParams() as WorkTimeReportPageQueryParams;
  const { data, isFetching, isLoading } = useQuery(
    ['ANALITICS/WORK_TIME', requestParams],
    () => fetchPageWorkTimeList(requestParams),
    {
      enabled: Object.keys(requestParams).length > 0,
    }
  );

  const workTimeList = useMemo(() => {
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
          {workTimeList?.map((workTimeItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <WorkTimeListItem key={index} data={workTimeItem} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={data?.length} />
    </>
  );
};

export default WorkTimeListPageView;
