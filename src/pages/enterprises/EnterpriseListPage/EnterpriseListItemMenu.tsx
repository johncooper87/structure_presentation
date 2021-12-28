import { Divider } from '@material-ui/core';
import { Menu, MenuItem, CascadingMenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog, routeForward } from 'utils';

const handleSeeDetails = () =>
  routeForward('/enterprises/' + getMenuData<EnterpriseDTO>().enterprise.id);
const handleDelete = () =>
  openDialog('ENTERPRISES/DELETE', getMenuData<EnterpriseDTO>().enterprise);
const handleSeeSites = () =>
  routeForward('/sites?enterpriseId=' + getMenuData<EnterpriseDTO>().enterprise.id);
const handleSeeWorkers = () =>
  routeForward('/workers?enterpriseId=' + getMenuData<EnterpriseDTO>().enterprise.id);
const handleSeeDevices = () =>
  routeForward('/devices?enterpriseId=' + getMenuData<EnterpriseDTO>().enterprise.id);

function EnterpriseListItemMenu() {
  const { open } = useMenuState<EnterpriseDTO>('ENTERPRISES/ENTERPRISE_ITEM');

  return (
    <Menu open={open}>
      <MenuItem template="details" onClick={handleSeeDetails} />
      <MenuItem template="delete" onClick={handleDelete} />
      <Divider />
      <CascadingMenuItem template="readmore">
        <MenuItem text="Объекты" onClick={handleSeeSites} />
        <MenuItem text="Сотрудники" onClick={handleSeeWorkers} />
        <MenuItem text="Устройства" onClick={handleSeeDevices} />
      </CascadingMenuItem>
    </Menu>
  );
}

export default EnterpriseListItemMenu;
