import { Menu, MenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog, routeForward } from 'utils';

const handleSeeDetails = () => routeForward('/admin/users/' + getMenuData<UserListItemDTO>().id);
const handleDelete = () => openDialog('USERS/DELETE', getMenuData());

function UserListItemMenu() {
  const { open } = useMenuState<UserListItemDTO>('USERS/USER_ITEM');

  return (
    <Menu open={open}>
      <MenuItem template="details" onClick={handleSeeDetails} />
      <MenuItem template="delete" onClick={handleDelete} />
    </Menu>
  );
}

export default UserListItemMenu;
