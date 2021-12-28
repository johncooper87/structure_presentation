import { Grid } from '@material-ui/core';
import { FieldError, Form, SubmitButton, TextField, TopbarTitle } from 'components';
import { ConstructionSiteSelect, ZoneSelect } from 'templates';
import { http, notify } from 'utils';
import styles from './styles.module.scss';
import TemplateBar from './TemplateBar';
import { validateWorkerNotification } from './validation';
import WorkerSelectList from './WorkerSelectList';

const httpOptions = {
  onSuccess: () => notify.success('Уведомление успешно отправлено'),
  onError: () => notify.error('Не удалось отправить уведомление'),
};
async function sendWorkerNotification({ values }: WorkerNotificationSubmitData) {
  const { constructionSiteId, workerIds, zoneId, message: text } = values;
  if (zoneId)
    http.post(
      '/api/kbi/watchpush/sendalertbyzoneid',
      { constructionSiteId, zoneId, text },
      httpOptions
    );
  else http.post('/api/kbi/watchpush/sendalertbyworkers', { workerIds, text }, httpOptions);
}

function WorkerNotification() {
  const { mutate } = useMutation([], sendWorkerNotification);

  return (
    <>
      <TopbarTitle>Уведомление сотрудников</TopbarTitle>
      <div className={styles.root}>
        <Form validate={validateWorkerNotification} onSubmit={mutate}>
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ConstructionSiteSelect onlyWithSigurSystem={false} />
                </Grid>
                <Grid item xs={6}>
                  <ZoneSelect />
                </Grid>
                <Grid item xs={12}>
                  <WorkerSelectList />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <TemplateBar />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    rows={24}
                    name="message"
                    label="Сообщение"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div className="footer">
            <FieldError name="__form" />
            <Grid container justifyContent="flex-end">
              <SubmitButton className="danger" variant="contained" label="Отправить" />
            </Grid>
          </div>
        </Form>
      </div>
    </>
  );
}

export default WorkerNotification;
