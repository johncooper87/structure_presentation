import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Form, SubmitButton } from 'components';
import { ConstructionSiteSelect } from 'templates';
import { http, notify, refetchActiveQuery } from 'utils';
import WorkerSelectList from '../WorkerNotification/WorkerSelectList';
import styles from './styles.module.scss';

function requestBiometry({ values }: BiometryRequestSubmitData) {
  const { workerIds, siteId } = values;
  return http.post(
    '/api/kbi/watchpush/requestbiometricsbyworkers',
    { workerIds, siteId },
    {
      onSuccess: () => notify.success('Биометрия успешно запрошена'),
      onError: () => notify.error('Не удалось запросить биометрию'),
    }
  );
}

function BiometryRequestDialog({
  open,
  onClose,
  onSuccess,
  siteId,
  queryName = 'ADMIN/BIOMETRY',
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  siteId?: string;
  queryName?: string;
}) {
  const { mutate } = useMutation([], requestBiometry, {
    onSuccess: () => {
      refetchActiveQuery(queryName);
      onClose();
      onSuccess?.();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} className={styles.requestDialog}>
      <DialogTitle>Запросить биометрию</DialogTitle>
      <Form onSubmit={mutate} initialValues={siteId ? { siteId } : undefined}>
        <DialogContent>
          {!siteId && (
            <ConstructionSiteSelect fullWidth required name="siteId" onlyWithSigurSystem={false} />
          )}
          <WorkerSelectList name="workerIds" constructionSiteFieldName="siteId" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Закрыть</Button>
          <SubmitButton className="danger" variant="contained" label="Запросить" />
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default BiometryRequestDialog;
