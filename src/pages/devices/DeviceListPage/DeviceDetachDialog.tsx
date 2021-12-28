import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import DetachIcon from 'components/icons/PersonOff';
import BatchDetachIcon from 'components/icons/GroupOff';

import { store } from 'app';
import { Dialog, LinearProgress, DialogButton, List } from 'components';
import { useDialogState } from 'hooks';
import { closeDialog, refetchActiveQuery } from 'utils';
import { DialogCancelButton } from 'templates/actions';
import detachDevices from '../mutations/detachDevices';
import DeviceListItem from './DeviceListItem';

function DeviceDetachDialog() {
  const { data, open } = useDialogState<DeviceDTO[]>('DEVICES/DETACH');
  const multipleDevices = data?.length > 1;

  const detachMutation = () => detachDevices(data.map(device => device.id));
  const handleSuccess = () => {
    closeDialog();
    if (multipleDevices) store.dispatch({ type: 'CLEAR_SELECTED_DEVICES' });
    refetchActiveQuery('DEVICES/DEVICE_LIST');
  };
  const { mutate, isLoading } = useMutation(detachMutation, { onSuccess: handleSuccess });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  const title =
    'Вы действительно хотите открепить ' +
    (multipleDevices ? 'указанный список устройств?' : 'указанное устройство?');
  const ConfirmIcon = multipleDevices ? BatchDetachIcon : DetachIcon;
  const deviceItemArray = useMemo(() => {
    if (!data) return null;
    return data?.map(device => <DeviceListItem key={device.id} data={device} />);
  }, [data]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <List>{deviceItemArray}</List>
      </DialogContent>

      <DialogActions>
        <LinearProgress display={isLoading} />
        <DialogCancelButton />
        <DialogButton className="danger" onClick={handleConfirm}>
          <ConfirmIcon className="leading-icon" />
          Открепить
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}

export default DeviceDetachDialog;
