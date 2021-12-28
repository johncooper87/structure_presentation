import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { history } from 'app';
import { routeBack } from 'actions';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import deleteUser from './mutations/deleteUser';

function handleSuccess() {
  closeDialog();
  if (history.location.pathname !== '/admin/users') routeBack();
  refetchActiveQuery('USERS/USER_LIST');
}

function UserDeleteDialog() {
  const { data: user, open } = useDialogState<UserDTO & UserFormValues>('USERS/DELETE');
  const { mutate, isLoading } = useMutation([], () => deleteUser(user?.id), {
    onSuccess: handleSuccess,
  });
  const handleConfirm = useCallback(() => mutate(), [mutate]);
  const { fullName, lastname, firstname, middlename } = user || {};
  const fullname = fullName || [lastname, firstname, middlename].filter(_ => _).join(' ');

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Вы действительно хотите удалить указанного пользователя?</DialogTitle>
      <DialogContent>{fullname}</DialogContent>
      <DialogActions>
        <LinearProgress className="danger" display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="delete" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default UserDeleteDialog;
