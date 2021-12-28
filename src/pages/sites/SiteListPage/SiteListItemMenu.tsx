import { Divider } from '@material-ui/core';
import { Menu, MenuItem, CascadingMenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog, routeForward } from 'utils';

const handleSeeDetails = () => routeForward('/sites/' + getMenuData<SiteDTO>().zoneGroup.id);
const handleDelete = () => openDialog('SITES/DELETE', getMenuData<SiteDTO>());
const handleSeeEnterprise = () =>
  routeForward('/enterprises/' + getMenuData<SiteDTO>().zoneGroup.attributes.enterpriseId);

function SiteListItemMenu() {
  const { open, data: site } = useMenuState<SiteDTO>('SITES/SITE_ITEM');

  return (
    <Menu open={open}>
      <MenuItem template="details" onClick={handleSeeDetails} />
      <MenuItem template="delete" onClick={handleDelete} />
      {site?.zoneGroup.attributes.sigurObject !== 'True' && [
        <Divider key="divider" />,
        <CascadingMenuItem key="cascading-menu" template="readmore">
          <MenuItem text="Компания" onClick={handleSeeEnterprise} />
        </CascadingMenuItem>]}
    </Menu>
  );
}

export default SiteListItemMenu;
