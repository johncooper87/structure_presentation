import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import RespondeIcon from '@material-ui/icons/Send';

import { DialogButton, TextField, Form, SubmitButton, LinearProgress } from 'components';
import { useDialogState, useLayout } from 'hooks';
import { http, notify, closeDialog } from 'utils';
import { DialogCancelButton } from 'templates/actions';

async function respondeToAlert(alertId: string, comment: string) {
  const body = { alertId, comment };
  await http.post(`/api/kbi/alert/responde`, body, {
    onSuccess: () => notify.success('Тревога успешно обработана'),
    onError: () => notify.error('Не удалось обработать тревогу'),
  });
}

const respondeIcon = <RespondeIcon />;

function AlertRespondeDialogContent() {
  const { data: alert } = useDialogState<AlertDTO>('ALERTS/RESPONDE');
  const { mutate, isLoading } = useMutation(
    ({ values }: AlertRespondeSubmitData) => respondeToAlert(alert?.alertId, values.comment),
    { onSuccess: closeDialog }
  );

  const layout = useLayout();

  return (
    <>
      <DialogTitle>Отреагировать на тревогу</DialogTitle>

      <Form onSubmit={mutate}>
        <DialogContent style={{ width: layout === 'mobile' ? '300px' : '500px' }}>
          <TextField
            fullWidth
            multiline
            rows="5"
            name="comment"
            label="Комментарий"
            helperText="Максимальное число символов: 160"
          />
        </DialogContent>

        <DialogActions>
          <LinearProgress display={isLoading} />
          <DialogCancelButton />
          <DialogButton render={<SubmitButton icon={respondeIcon} label="Отправить" />} />
        </DialogActions>
      </Form>
    </>
  );
}

export default AlertRespondeDialogContent;
