import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, SubmitButton } from 'components';
import { useFormPageMode } from 'hooks';

import fetchPageEnterprise from '../queries/fetchPageEnterprise';
import createEnterprise from '../mutations/createEnterprise';
import updateEnterprise from '../mutations/updateEnterprise';
import EnterpriseToolbar from './EnterpriseToolbar';
import EnterprisePageView from './EnterprisePageView';

const content = <EnterprisePageView />;

interface EnterprisePagePathParams {
  id: string;
}

const EnterprisePage = () => {
  const { id } = usePathParams<EnterprisePagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const { data: enterprise, isLoading, isFetching, isError } = useQuery(
    ['ENTERPRISES/ENTERPRISE', id],
    () => fetchPageEnterprise(id),
    { enabled: !creationMode }
  );

  const submit = creationMode
    ? createEnterprise
    : (data: EnterpriseSubmitData) => updateEnterprise(id, data);
  const handleSuccess = creationMode ? routeBack : () => cancelPageEditMode();
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <Form readOnly={readingMode} initialValues={enterprise} enableReinitialize onSubmit={mutate}>
      <CircularProgress display={isLoading} />
      <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
      {!isLoading && content}
      <SubmitButton template="save-fab" />
      <EnterpriseToolbar disabled={isFetching || isMutating || isError} />
    </Form>
  );
};

export default EnterprisePage;
