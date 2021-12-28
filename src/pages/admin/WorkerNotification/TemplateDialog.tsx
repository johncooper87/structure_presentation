import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from '@material-ui/core';

import { Form, TextField, SubmitButton } from 'components';
import { http, refetchActiveQuery, notify } from 'utils';
import { validateTemplateName } from './validation';

async function saveMessageTemplate({ values }: TemplateSubmitData) {
  http.post('/api/kbi/watchpush/template/inserttemplatepush', values, {
    onSuccess: () => notify.success('Шаблон сообщения успешно добавлен'),
    onError: () => notify.error('Не удалось добавить шаблон сообщения'),
  });
}
interface TemplateFormValues {
  name: string;
  text: string;
}
type TemplateSubmitData = SubmitData<TemplateFormValues>;

interface TemplateDialogProps extends Omit<DialogProps, 'onClose'> {
  templateText?: string;
  onClose: () => void;
}

function TemplateDialog({ templateText, onClose, ...props }: TemplateDialogProps) {
  const { mutate, isLoading } = useMutation([], saveMessageTemplate, {
    onSuccess: () => {
      onClose();
      refetchActiveQuery('SELECT/MESSAGE_TEMPLATE');
    },
  });
  const close = isLoading ? undefined : onClose;
  return (
    <Form<TemplateFormValues>
      initialValues={{ name: '', text: templateText }}
      enableReinitialize
      onSubmit={mutate}
    >
      <Dialog onClose={close} {...props}>
        <DialogTitle>Сохранить шаблон сообщения</DialogTitle>
        <DialogContent>
          <TextField fullWidth name="name" label="Название" validate={validateTemplateName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Отмена</Button>
          <SubmitButton variant="contained" color="primary" label="Сохранить" />
        </DialogActions>
      </Dialog>
    </Form>
  );
}

export default React.memo(TemplateDialog);
