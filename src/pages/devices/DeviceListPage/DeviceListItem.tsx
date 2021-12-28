import { Grid, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import { store } from 'app';
import { openMenu } from 'utils';
import { ListItemMoreAction, ListItemSelectAction } from 'templates/actions';
import {
  ListItemWorker,
  ListItemEnterprise,
  ListItemConstructionSiteList,
  DeviceAvatar,
} from 'templates/data';

const deviceListItemSelector = (selectedDevices: any[], data: any) => {
  if (selectedDevices == null)
    return {
      inSelectingMode: false,
      selected: false,
    };

  const index = selectedDevices?.findIndex(({ id }) => id === data.id);
  const selected = index > -1;

  if (selected && data.worker == null) {
    selectedDevices.splice(index, 1);
    return {
      inSelectingMode: true,
      selected: false,
    };
  }

  return {
    inSelectingMode: true,
    selected,
  };
};

function handleMoreAction(event: React.MouseEvent, device: DeviceDTO) {
  openMenu('DEVICES/DEVICE_ITEM', event.currentTarget, device);
}
function handleSelectAction(event: any, selected: boolean, device: DeviceDTO) {
  store.dispatch({ type: 'UPDATE_SELECTED_DEVICES', device });
}

interface DeviceListItemProps {
  data: Partial<DeviceDTO>;
  enableAction?: boolean;
}

function DeviceListItem({ data, enableAction }: DeviceListItemProps) {
  const { model, gpsAddr, worker, enterprise, constructionSites, attributes } = data;
  const { status } = attributes;
  const attached = worker != null;
  const archive = status === 'False' || status === 'false';

  const currentSelector = useCallback(
    ({ deviceListPage }: AppState) => deviceListItemSelector(deviceListPage.selectedDevices, data),
    [data]
  );
  const { inSelectingMode, selected } = useSelector(currentSelector, shallowEqual);

  const secondaryAction = inSelectingMode ? (
    attached && (
      <ListItemSelectAction data={data} selected={selected} onChange={handleSelectAction} />
    )
  ) : (
    <ListItemMoreAction data={data} onClick={handleMoreAction} />
  );

  return (
    <ListItem>
      <ListItemAvatar>
        <DeviceAvatar {...{ model, attached, archive }} />
      </ListItemAvatar>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <ListItemText
            primary={<p>{gpsAddr}</p>}
            secondary={attached ? <ListItemWorker data={worker} /> : <p>Не выдано</p>}
          />
        </Grid>
        <Grid item sm={6} xs={12} className="col-2">
          <ListItemText
            primary={<ListItemEnterprise data={enterprise} />}
            secondary={<ListItemConstructionSiteList data={constructionSites} />}
          />
        </Grid>
      </Grid>
      {enableAction && secondaryAction}
    </ListItem>
  );
}

export default DeviceListItem;
