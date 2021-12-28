import { CircularProgress, TopbarProgress } from 'components';

import fetchPageSite from '../../../queries/fetchPageSite';
import fetchSiteSubcontractorList from '../../../queries/fetchSiteSubcontractorList';
import SiteSubcontractorListToolbar from './SiteSubcontractorListToolbar';
import SiteSubcontractorListView from './SiteSubcontractorListView';
import SiteSubcontractorFormDialog from './SiteSubcontractorFormDialog';

const SiteSubcontractorListPage = () => {
  const { id } = usePathParams<SitePagePathParams>();

  const { data: site } = useQuery(['SITES/SITE', id], () => fetchPageSite(id));

  const {
    data: subcontractors,
    isLoading,
    isFetching,
  } = useQuery(['SITES/SITE_SUBCONTRACTORS', id], () => fetchSiteSubcontractorList(id));

  return (
    <>
      <CircularProgress display={isLoading} />
      <TopbarProgress display={!isLoading && isFetching} />
      {!isLoading && <SiteSubcontractorListView data={subcontractors} />}
      <SiteSubcontractorListToolbar name={site?.name} />
      <SiteSubcontractorFormDialog subcontractors={subcontractors} />
    </>
  );
};

export default SiteSubcontractorListPage;
