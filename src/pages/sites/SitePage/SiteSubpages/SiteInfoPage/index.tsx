import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, SubmitButton } from 'components';
import { useFormPageMode } from 'hooks';

import fetchPageSite from '../../../queries/fetchPageSite';
import createSite from '../../../mutations/createSite';
import updateSite from '../../../mutations/updateSite';
import SiteInfoToolbar from './SiteInfoToolbar';
import SiteInfoView from './SiteInfoView';
import validateSite from './validateSite';

const content = <SiteInfoView />;

interface SiteInfoPagePathParams {
  id: string;
}

const SiteInfoPage = () => {
  const { id } = usePathParams<SiteInfoPagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const {
    data: site,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['SITES/SITE', id], () => fetchPageSite(id), { enabled: !creationMode });

  const submit = creationMode ? createSite : (data: SiteSubmitData) => updateSite(id, data);
  const handleSuccess = creationMode ? routeBack : () => cancelPageEditMode();
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <>
      <Form
        readOnly={readingMode}
        initialValues={site}
        enableReinitialize
        validate={validateSite}
        onSubmit={mutate}
      >
        <CircularProgress display={isLoading} />
        <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
        {!isLoading && content}
        <SubmitButton template="save-fab" />
        <SiteInfoToolbar disabled={isFetching || isMutating || isError} />
      </Form>
    </>
  );
};

export default SiteInfoPage;
