import { routeToCreatePage } from 'actions';
import { TopbarTitle, Toolbar, ToolbarItem, TopbarSearch, Fab } from 'components';

function UserListToolbar() {
  return (
    <>
      <TopbarTitle>Пользователи</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" alwaysVisible />
        <ToolbarItem template="download" />
        <ToolbarItem template="print" />
      </Toolbar>
      <Fab template="create" onClick={routeToCreatePage} />
    </>
  );
}

export default UserListToolbar;
