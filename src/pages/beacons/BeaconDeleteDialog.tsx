import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteBeacon from './mutations/deleteBeacon';
import BeaconListItem from './BeaconListPage/BeaconListItem';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/beacons') routeBack();
  refetchActiveQuery('BEACONS/BEACON_LIST');
}

function BeaconDeleteDialog() {
  const { data: beacon, open } = useDialogState<Beacon | BeaconFormValues>('BEACONS/DELETE');
  const { mutate, isLoading } = useMutation([], () => deleteBeacon(beacon?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанный маяк?</DialogTitle>
      <DialogContent>
        <BeaconListItem selectable={false} data={(beacon ?? {}) as Beacon} />
      </DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default BeaconDeleteDialog;
