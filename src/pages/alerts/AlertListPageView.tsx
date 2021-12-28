import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import { socket } from 'app';
import { refetchActiveQuery } from 'utils';
import AlertListItem from './AlertListItem';
import fetchPageAlertList from './fetchPageAlertList';

const AlertListPageView = () => {
  const queryParams = useQueryParams();
  const { data: alerts, isFetching, isLoading } = useQuery(['ALERTS/ALERT_LIST', queryParams], () =>
    fetchPageAlertList(queryParams)
  );

  useEffect(() => {

    const unsubscriber = socket.subscribe('ALERT_RECEIVED', () => {
      refetchActiveQuery('ALERTS/ALERT_LIST');
    });

    return () => unsubscriber();
  });

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {alerts?.data?.map((alert, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <AlertListItem key={index} data={alert} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={alerts?.totalRecords} />
    </>
  );
};

export default AlertListPageView;
