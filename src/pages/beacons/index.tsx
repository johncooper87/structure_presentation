import { Route } from 'react-router-dom';
import BeaconListPage from './BeaconListPage';
import BeaconPage from './BeaconPage';
import BeaconDeleteDialog from './BeaconDeleteDialog';

const BeaconsRouting = () => {
  return (
    <>
      <Route exact path="/beacons" component={BeaconListPage} />
      <Route exact path="/beacons/:id/(edit)?" component={BeaconPage} />
      <BeaconDeleteDialog />
    </>
  );
};

export default BeaconsRouting;
