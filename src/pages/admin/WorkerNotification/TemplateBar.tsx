import { useForm, useFormState } from 'components/Form';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core';
import { http, notify } from 'utils';
import TemplateDialog from './TemplateDialog';

interface MessageTemplate {
  id: string;
  name: string;
  text: string;
}

function fetchMessageTemplates(): Promise<MessageTemplate[]> {
  return http.get('/api/kbi/watchpush/template/gettemplatepushs');
}

function WorkerNotification() {
  const { data: templates, isLoading } = useQuery(
    'SELECT/MESSAGE_TEMPLATE',
    () => fetchMessageTemplates(),
    {
      cacheTime: 10 * 60 * 1000,
      onError: () => notify.error('Не удалось получить список шаблонов'),
    }
  );

  const form = useForm();
  const { values } = useFormState<{ message: string }>();
  const [selectedMessage, setSelectedMessage] = useState('');
  const formMessage = values?.message || '';
  const handleTemplateChange = useCallback<SelectProps['onChange']>(event => {
    const value = event.target.value as string;
    form.change('message', value);
    setSelectedMessage(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const disableSave = selectedMessage === formMessage;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Button
            disabled={disableSave}
            color="primary"
            variant="outlined"
            size="small"
            onClick={openDialog}
          >
            Сохранить
          </Button>
        </Grid>
        <Grid item>
          <FormControl margin="dense" disabled={isLoading}>
            <InputLabel variant="outlined">Шаблоны</InputLabel>
            <Select
              value=""
              label="Шаблон"
              variant="outlined"
              style={{ minWidth: '200px' }}
              onChange={handleTemplateChange}
            >
              {templates?.map(({ id, text, name }) => (
                <MenuItem key={id} value={text}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TemplateDialog
        open={dialogOpen}
        onClose={closeDialog}
        templateText={dialogOpen ? formMessage : ''}
      />
    </>
  );
}

export default WorkerNotification;
