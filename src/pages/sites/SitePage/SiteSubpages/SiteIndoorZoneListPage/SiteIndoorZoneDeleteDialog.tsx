import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteSiteIndoorZone from '../../../mutations/deleteSiteIndoorZone';

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_INDOOR_ZONES');
}

function SiteIndoorZoneDeleteDialog() {
  const { data: zone, open } = useDialogState<SiteIndoorZone>('SITES/DELETE_INDOOR_ZONE');

  const { mutate, isLoading } = useMutation([], () => deleteSiteIndoorZone(zone?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанное помещение?</DialogTitle>
      <DialogContent>{zone?.floor}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default SiteIndoorZoneDeleteDialog;
