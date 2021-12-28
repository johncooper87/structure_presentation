/* eslint-disable react/no-unescaped-entities */
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Dialog, LinearProgress, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates/actions';
import { closeDialog, refetchActiveQuery } from 'utils';
import updateSubcontractorStatus from '../../../../mutations/updateSubcontractorStatus';

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_SUBCONTRACTORS');
}

function SiteSubcontractorStatusDialog() {
  const { id: siteId } = usePathParams<SitePagePathParams>();
  const { data, open } = useDialogState<SubcontractorStatusDialogState>(
    'SITES/SUBCONTRACTOR_STATUS'
  );

  const { mutate, isLoading } = useMutation(
    [],
    () => updateSubcontractorStatus(siteId, data.enterpriseId, data.active),
    {
      onSuccess: handleSuccess,
    }
  );
  const handleConfirm = useCallback(() => mutate(), [mutate]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>
        Вы действительно хотите изменить статус субподрядчика на "{' '}
        {data?.active ? 'активный' : 'неактивный'}"?
      </DialogTitle>
      <DialogContent>{data?.name} </DialogContent>
      <DialogActions>
        <LinearProgress display={isLoading} />
        <DialogCancelButton />
        <DialogButton template="accept" onClick={handleConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default SiteSubcontractorStatusDialog;
