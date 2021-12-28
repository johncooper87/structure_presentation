import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import UserListItem from './UserListItem';
import fetchPageUserList from '../queries/fetchPageUserList';

const UserListPageView = () => {
  const queryParams = useQueryParams();
  const {
    data: users,
    isFetching,
    isLoading,
  } = useQuery(['USERS/USER_LIST', queryParams], () => fetchPageUserList(queryParams));

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {users?.data?.map(user => (
            <UserListItem key={user.id} data={user} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={users?.totalRecords} />
    </>
  );
};

export default UserListPageView;
