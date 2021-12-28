import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import DeviceListItem from './DeviceListItem';
import fetchPageDeviceList from '../queries/fetchPageDeviceList';

const DeviceListPageView = () => {
  const queryParams = useQueryParams();
  const { data: devices, isFetching, isLoading } = useQuery(
    ['DEVICES/DEVICE_LIST', queryParams],
    () => fetchPageDeviceList(queryParams)
  );

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {devices?.data?.map(device => (
            <DeviceListItem enableAction key={device.id} data={device} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={devices?.totalRecords} />
    </>
  );
};

export default DeviceListPageView;
