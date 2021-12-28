import { Route } from 'react-router-dom';
import UserListPage from './UserListPage';
import UserPage from './UserPage';
import UserDeleteDialog from './UserDeleteDialog';

const UsersRouting = () => {
  return (
    <>
      <Route exact path="/admin/users" component={UserListPage} />
      <Route exact path="/admin/users/:id/(edit)?" component={UserPage} />
      <UserDeleteDialog />
    </>
  );
};

export default UsersRouting;
