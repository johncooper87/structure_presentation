import { Route } from 'react-router-dom';
import DeviceListPage from './DeviceListPage';
import DevicePage from './DevicePage';
import DeviceDeleteDialog from './DeviceDeleteDialog';

const DevicesRouting = () => {
  return (
    <>
      <Route exact path="/devices" component={DeviceListPage} />
      <Route exact path="/devices/:id/(edit)?" component={DevicePage} />
      <DeviceDeleteDialog />
    </>
  );
};

export default DevicesRouting;
