import { ListItemText, Switch, Divider } from '@material-ui/core';
import { store } from 'app';
import { Menu, MenuItem } from 'components';
import { useMenuState } from 'hooks';
import widgets from './widgets';

const itemKeyList = Object.keys(widgets);

function handleWidgetDisplayStateChange(
  event: React.MouseEvent<Element, MouseEvent>,
  itemKey: string
) {
  store.dispatch({ type: 'TOGGLE_ITEM_DISPLAY_STATE', itemKey });
}

const widgetCustomizationMenuSelector = ({ dashboard }: AppState) => dashboard.layouts;

function WidgetCustomizationMenu() {
  const { open } = useMenuState('DASHBOARD/WIDGET_CUSTOMIZATION');
  const layouts = useSelector(widgetCustomizationMenuSelector, shallowEqual);
  const itemKeys = Object.keys(layouts);

  return (
    <Menu open={open}>
      <MenuItem disableCloseOnClick data="ALL" onClick={handleWidgetDisplayStateChange}>
        <ListItemText>Выбрать все</ListItemText>
        <Switch checked={itemKeys.length === itemKeyList.length} />
      </MenuItem>
      <Divider />
      {itemKeyList.map(widgetName => (
        <MenuItem
          disableCloseOnClick
          key={widgetName}
          data={widgetName}
          onClick={handleWidgetDisplayStateChange}
        >
          <ListItemText>{widgets[widgetName].title}</ListItemText>
          <Switch checked={itemKeys.includes(widgetName)} />
        </MenuItem>
      ))}
    </Menu>
  );
}

export default WidgetCustomizationMenu;
