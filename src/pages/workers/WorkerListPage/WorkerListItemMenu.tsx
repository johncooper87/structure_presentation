import { Divider } from '@material-ui/core';
import { Menu, MenuItem, CascadingMenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog, routeForward } from 'utils';

const handleSeeDetails = () => routeForward('/workers/' + getMenuData<WorkerDTO>().id);
const handleDelete = () => openDialog('WORKERS/DELETE', getMenuData());
const handleSeeEnterprise = () =>
  routeForward('/company/' + getMenuData<DeviceDTO>().enterprise.id);
const handleSeeConstructionSite = (event: any, site: ConstructionSite) =>
  routeForward('/project/' + site.id);
const handleSeeDevice = () => routeForward('/devices/' + getMenuData<WorkerDTO>().device.id);

function WorkerListItemMenu() {
  const { open, data: worker } = useMenuState<WorkerDTO>('WORKERS/WORKER_ITEM');
  const attached = Boolean(worker?.device);

  return (
    <Menu open={open}>
      <MenuItem template="details" onClick={handleSeeDetails} />
      <MenuItem template="delete" onClick={handleDelete} />
      <Divider />
      <CascadingMenuItem template="readmore" key={2}>
        <MenuItem text="О компании" onClick={handleSeeEnterprise} />
        {worker?.builds?.length > 1 ? (
          <CascadingMenuItem text="Об объектах">
            {worker.builds.map(site => (
              <MenuItem
                key={site.id}
                text={site.name}
                onClick={handleSeeConstructionSite}
                data={site}
              />
            ))}
          </CascadingMenuItem>
        ) : (
          worker?.builds?.length === 1 && (
            <MenuItem
              text="Об объекте"
              onClick={handleSeeConstructionSite}
              data={worker.builds[0]}
            />
          )
        )}
        {attached && <MenuItem text="Об устройстве" onClick={handleSeeDevice} />}
      </CascadingMenuItem>
    </Menu>
  );
}

export default WorkerListItemMenu;
