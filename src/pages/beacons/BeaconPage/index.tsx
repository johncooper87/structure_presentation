import * as yup from 'yup';
import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, SubmitButton } from 'components';
import { useFormPageMode } from 'hooks';

import fetchPageBeacon from '../queries/fetchPageBeacon';
import createBeacon from '../mutations/createBeacon';
import updateBeacon from '../mutations/updateBeacon';
import BeaconToolbar from './BeaconToolbar';
import BeaconPageView from './BeaconPageView';
// import { refetchActiveQuery } from 'utils';

const content = <BeaconPageView />;

interface BeaconPagePathParams {
  id: string;
}

export const beaconFormVS = yup.object().shape({
  siteId: yup.string().nullable().required(),
  indoorZoneId: yup.string().nullable().required(),
  uuId: yup
    .string()
    .matches(
      /[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/,
      'Неверный формат'
    ),
  address: yup
    .string()
    .nullable()
    .matches(
      /[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}:[a-zA-Z0-9]{2}/,
      'Неверный формат'
    )
    .required(),
  latitude: yup.number().typeError('Неферный формат координаты').nullable().required(),
  longitude: yup.number().typeError('Неферный формат координаты').nullable().required(),
  major: yup.number().nullable().required(),
  minor: yup.number().nullable().required(),
});

const BeaconPage = () => {
  const { id } = usePathParams<BeaconPagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const {
    data: beacon,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['BEACONS/BEACON', id], () => fetchPageBeacon(id), { enabled: !creationMode });

  const submit = creationMode ? createBeacon : (data: BeaconSubmitData) => updateBeacon(id, data);
  const handleSuccess = creationMode ? routeBack : () => {
    // refetchActiveQuery('BEACONS/BEACON');
    cancelPageEditMode();
  };
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <Form
      readOnly={readingMode}
      initialValues={
        beacon ??
        ({ siteId: window.lastSelectedIndoorSiteId, major: 0, minor: 0 } as BeaconFormValues)
      }
      enableReinitialize
      onSubmit={mutate}
      validate={beaconFormVS}
    >
      <CircularProgress display={isLoading} />
      <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
      {!isLoading && content}
      <SubmitButton template="save-fab" />
      <BeaconToolbar disabled={isFetching || isMutating || isError} />
    </Form>
  );
};

export default BeaconPage;
