import { List, QueryPaginator, Overlay, CircularProgress, TopbarProgress } from 'components';
import { useQueryParams } from 'hooks';
import SiteListItem from './SiteListItem';
import fetchPageSiteList from '../queries/fetchPageSiteList';

const SiteListPageView = () => {
  const queryParams = useQueryParams();
  const {
    data: sites,
    isFetching,
    isLoading,
  } = useQuery(['SITES/SITE_LIST', queryParams], () => fetchPageSiteList(queryParams));

  return (
    <>
      <Overlay display={isFetching}>
        <CircularProgress display={isLoading} />
        <TopbarProgress display={!isLoading && isFetching} />
        <List>
          {sites?.data?.map(site => (
            <SiteListItem key={site.zoneGroup.id} data={site} />
          ))}
        </List>
      </Overlay>
      <QueryPaginator total={sites?.totalRecords} />
    </>
  );
};

export default SiteListPageView;
