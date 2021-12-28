import { routeBack, cancelPageEditMode } from 'actions';
import { CircularProgress, Form, TopbarProgress, SubmitButton } from 'components';
import { useFormPageMode } from 'hooks';

import { userValidationSchema } from './validation';
import fetchPageUser from '../queries/fetchPageUser';
import createUser from '../mutations/createUser';
import updateUser from '../mutations/updateUser';
import UserToolbar from './UserToolbar';
import UserPageView from './UserPageView';

const content = <UserPageView />;

interface UserPagePathParams {
  id: string;
}

const UserPage = () => {
  const { id } = usePathParams<UserPagePathParams>();
  const formMode = useFormPageMode();
  const creationMode = formMode === 'create';
  const readingMode = formMode === 'read';

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['USERS/USER', id], () => fetchPageUser(id), { enabled: !creationMode });

  const submit = creationMode ? createUser : (data: UserSubmitData) => updateUser(id, data);
  const handleSuccess = creationMode ? routeBack : () => cancelPageEditMode();
  const { mutate, isLoading: isMutating } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  return (
    <Form
      readOnly={readingMode}
      initialValues={user}
      enableReinitialize
      validate={userValidationSchema}
      onSubmit={mutate}
    >
      <CircularProgress display={isLoading} />
      <TopbarProgress display={isMutating || (!isLoading && isFetching)} />
      {!isLoading && content}
      <SubmitButton template="save-fab" />
      <UserToolbar disabled={isFetching || isMutating || isError} />
    </Form>
  );
};

export default UserPage;
