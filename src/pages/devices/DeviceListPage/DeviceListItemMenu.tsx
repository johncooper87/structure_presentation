import { Divider } from '@material-ui/core';
import DetachIcon from 'components/icons/PersonOff';
import { Menu, MenuItem, CascadingMenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog, routeForward } from 'utils';

const handleSeeDetails = () => routeForward('/devices/' + getMenuData<DeviceDTO>().id);
const handleDelete = () => openDialog('DEVICES/DELETE', getMenuData());
const handleDetach = () => openDialog('DEVICES/DETACH', [getMenuData()]);
const handleSeeWorker = () => routeForward('/workers/' + getMenuData<DeviceDTO>().worker.id);
const handleSeeEnterprise = () =>
  routeForward('/company/' + getMenuData<DeviceDTO>().enterprise.id);
const handleSeeConstructionSite = (event: any, site: ConstructionSite) =>
  routeForward('/project/' + site.id);

const detachIcon = <DetachIcon />;

function DeviceListItemMenu() {
  const { open, data: device } = useMenuState<DeviceDTO>('DEVICES/DEVICE_ITEM');
  const attached = Boolean(device?.worker);

  return (
    <Menu open={open}>
      <MenuItem template="details" onClick={handleSeeDetails} />
      <MenuItem template="delete" onClick={handleDelete} />
      {attached && [
        <MenuItem key={0} icon={detachIcon} text="Открепить" onClick={handleDetach} />,
        <Divider key={1} />,
        <CascadingMenuItem template="readmore" key={2}>
          <MenuItem text="О сотруднике" onClick={handleSeeWorker} />
          <MenuItem text="О компании" onClick={handleSeeEnterprise} />
          {device.constructionSites.length > 1 ? (
            <CascadingMenuItem text="Об объектах">
              {device.constructionSites.map(site => (
                <MenuItem
                  key={site.id}
                  text={site.name}
                  onClick={handleSeeConstructionSite}
                  data={site}
                />
              ))}
            </CascadingMenuItem>
          ) : (
            device.constructionSites.length === 1 && (
              <MenuItem
                text="Об объекте"
                onClick={handleSeeConstructionSite}
                data={device.constructionSites[0]}
              />
            )
          )}
        </CascadingMenuItem>,
      ]}
    </Menu>
  );
}

export default DeviceListItemMenu;
