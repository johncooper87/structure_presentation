import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import EnterpriseListItem from './EnterpriseListItem';
import fetchPageEnterpriseList from '../queries/fetchPageEnterpriseList';

const EnterpriseListPageView = () => {
  const queryParams = useQueryParams();
  const { data: enterprises, isFetching, isLoading } = useQuery(
    ['ENTERPRISES/ENTERPRISE_LIST', queryParams],
    () => fetchPageEnterpriseList(queryParams)
  );

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {enterprises?.data?.map(enterprise => (
            <EnterpriseListItem key={enterprise.enterprise.id} data={enterprise} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={enterprises?.totalRecords} />
    </>
  );
};

export default EnterpriseListPageView;
