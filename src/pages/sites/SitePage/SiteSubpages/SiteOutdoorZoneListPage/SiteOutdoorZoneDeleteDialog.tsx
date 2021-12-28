import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteSiteZone from '../../../mutations/deleteSiteZone';

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_ZONES');
}

function SiteOutdoorZoneDeleteDialog() {
  const { data: zone, open } = useDialogState<Zone>('SITES/DELETE_ZONE');

  const { mutate, isLoading } = useMutation([], () => deleteSiteZone(zone?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанную зону?</DialogTitle>
      <DialogContent>{zone?.name}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default SiteOutdoorZoneDeleteDialog;
