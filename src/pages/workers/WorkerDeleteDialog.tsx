import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteWorker from './mutations/deleteWorker';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/workers') routeBack();
  refetchActiveQuery('WORKERS/WORKER_LIST');
}

function WorkerDeleteDialog() {
  const { data: worker, open } = useDialogState<WorkerDTO & WorkerFormValues>('WORKERS/DELETE');
  const { mutate, isLoading } = useMutation([], () => deleteWorker(worker?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);
  const { fullName, lastname, firstname, middlename } = worker || {};
  const fullname = fullName || [lastname, firstname, middlename].filter(_ => _).join(' ');

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанного сотрудника?</DialogTitle>
      <DialogContent>{fullname}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default WorkerDeleteDialog;
