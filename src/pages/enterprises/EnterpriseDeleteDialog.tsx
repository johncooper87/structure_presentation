import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteEnterprise from './mutations/deleteEnterprise';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/enterprises') routeBack();
  refetchActiveQuery('ENTERPRISES/ENTERPRISE_LIST');
}

function EnterpriseDeleteDialog() {
  const { data: enterprise, open } = useDialogState<EnterpriseDTO & EnterpriseFormValues>(
    'ENTERPRISES/DELETE'
  );
  const { mutate, isLoading } = useMutation([], () => deleteEnterprise(enterprise?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);
  const { enterprise: _enterprise, name } = enterprise || {};

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанную компанию?</DialogTitle>
      <DialogContent>{_enterprise?.name || name}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default EnterpriseDeleteDialog;
