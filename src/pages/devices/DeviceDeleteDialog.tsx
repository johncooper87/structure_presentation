/* eslint-disable dot-notation */
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteDevice from './mutations/deleteDevice';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/devices') routeBack();
  refetchActiveQuery('DEVICES/DEVICE_LIST');
}

function DeviceDeleteDialog() {
  const { data: device, open } = useDialogState<DeviceDTO>('DEVICES/DELETE');
  const { mutate, isLoading } = useMutation([], () => deleteDevice(device?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>
        Вы действительно хотите удалить устройство с указанным серийным номером?
      </DialogTitle>
      <DialogContent>{device?.['serialNumber'] || device?.gpsAddr}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default DeviceDeleteDialog;
