import { Route } from 'react-router-dom';
import UsersPage from './users';
import BiometryPage from './Biometry';
import WorkerNotificationPage from './WorkerNotification';

const AdminRouting = () => {
  return (
    <>
      <Route path="/admin/users" component={UsersPage} />
      <Route exact path="/admin/worker-notification" component={WorkerNotificationPage} />
      <Route exact path="/admin/biometry" component={BiometryPage} />
    </>
  );
};

export default AdminRouting;
