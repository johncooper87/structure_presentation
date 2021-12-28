import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import WorkerListItem from './WorkerListItem';
import fetchPageWorkerList from '../queries/fetchPageWorkerList';

const WorkerListPageView = () => {
  const queryParams = useQueryParams();
  const { data: workers, isFetching, isLoading } = useQuery(
    ['WORKERS/WORKER_LIST', queryParams],
    () => fetchPageWorkerList(queryParams)
  );

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {workers?.data?.map(worker => (
            <WorkerListItem key={worker.id} data={worker} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={workers?.totalRecords} />
    </>
  );
};

export default WorkerListPageView;
