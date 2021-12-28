import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, SubmitButton } from 'components';
import { useFormPageMode } from 'hooks';

import { deviceValidationSchema } from './validation';
import fetchPageDevice from '../queries/fetchPageDevice';
import createDevice from '../mutations/createDevice';
import updateDevice from '../mutations/updateDevice';
import DeviceToolbar from './DeviceToolbar';
import DevicePageView from './DevicePageView';

const content = <DevicePageView />;

interface DevicePagePathParams {
  id: string;
}

const DevicePage = () => {
  const { id } = usePathParams<DevicePagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const { data: device, isLoading, isFetching, isError } = useQuery(
    ['DEVICES/DEVICE', id],
    () => fetchPageDevice(id),
    { enabled: !creationMode }
  );

  const submit = creationMode ? createDevice : (data: DeviceSubmitData) => updateDevice(id, data);
  const handleSuccess = creationMode ? routeBack : () => cancelPageEditMode();
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <Form
      readOnly={readingMode}
      initialValues={device}
      enableReinitialize
      validate={deviceValidationSchema}
      onSubmit={mutate}
    >
      <CircularProgress display={isLoading} />
      <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
      {!isLoading && content}
      <SubmitButton template="save-fab" />
      <DeviceToolbar disabled={isFetching || isMutating || isError} />
    </Form>
  );
};

export default DevicePage;
