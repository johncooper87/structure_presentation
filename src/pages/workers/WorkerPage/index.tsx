import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, Fab, SubmitButton, Radio } from 'components';
import { useFormPageMode } from 'hooks';

import { workerValidationSchema } from './validation';
import fetchPageWorker from '../queries/fetchPageWorker';
import createWorker from '../mutations/createWorker';
import updateWorker from '../mutations/updateWorker';
import WorkerToolbar from './WorkerToolbar';
import WorkerPageView from './WorkerPageView';

const content = <WorkerPageView />;

interface WorkerPagePathParams {
  id: string;
}

const WorkerPage = () => {
  const { id } = usePathParams<WorkerPagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const { data: worker, isLoading, isFetching, isError } = useQuery(
    ['WORKERS/WORKER', id],
    () => fetchPageWorker(id),
    { enabled: !creationMode }
  );

  const submit = creationMode ? createWorker : (data: WorkerSubmitData) => updateWorker(id, data);
  const handleSuccess = creationMode ? routeBack : () => cancelPageEditMode();
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <Form
      readOnly={readingMode}
      initialValues={worker}
      enableReinitialize
      validate={workerValidationSchema}
      onSubmit={mutate}
    >
      <CircularProgress display={isLoading} />
      <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
      {!isLoading && content}
      <SubmitButton template="save-fab" />
      <WorkerToolbar disabled={isFetching || isMutating || isError} />
    </Form>
  );
};

export default WorkerPage;
