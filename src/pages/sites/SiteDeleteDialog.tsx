import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteSite from './mutations/deleteSite';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/sites') routeBack();
  refetchActiveQuery('SITES/SITE_LIST');
}

function SiteDeleteDialog() {
  const { data: site, open } = useDialogState<SiteDTO & SiteFormValues>('SITES/DELETE');
  const { id, name } = site?.zoneGroup ?? site ?? {};

  const { mutate, isLoading } = useMutation([], () => deleteSite(id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанный объект?</DialogTitle>
      <DialogContent>{name}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default SiteDeleteDialog;
