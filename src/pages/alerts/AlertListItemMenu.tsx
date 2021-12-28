import MapIcon from '@material-ui/icons/Map';
import RespondeIcon from '@material-ui/icons/Feedback';
import { Menu, MenuItem } from 'components';
import { useMenuState } from 'hooks';
import { getMenuData, openDialog } from 'utils';

const handleShowOnMap = () => openDialog('ALERTS/MAP', getMenuData());
const handleResponde = () => openDialog('ALERTS/RESPONDE', getMenuData());

const mapIcon = <MapIcon />;
const respondeIcon = <RespondeIcon />;

function AlertListItemMenu() {
  const { open, data } = useMenuState<AlertDTO>('ALERTS/ALERT_ITEM');

  return (
    <Menu open={open}>
      <MenuItem icon={mapIcon} text="Показать на карте" onClick={handleShowOnMap} />
      {!data?.isLooked && (
        <MenuItem icon={respondeIcon} text="Отреагировать" onClick={handleResponde} />
      )}
    </Menu>
  );
}

export default AlertListItemMenu;
