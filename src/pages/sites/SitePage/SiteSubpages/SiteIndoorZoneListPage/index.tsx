import { CircularProgress, TopbarProgress } from 'components';

import fetchSiteIndoorZoneList from '../../../queries/fetchSiteIndoorZoneList';
import fetchSiteOutdoorZoneList from '../../../queries/fetchSiteOutdoorZoneList';
import SiteIndoorZoneListToolbar from './SiteIndoorZoneListToolbar';
import SiteIndoorZoneListView from './SiteIndoorZoneListView';
import SiteIndoorZoneDeleteDialog from './SiteIndoorZoneDeleteDialog';
import SiteIndoorZoneFormDialog from './SiteIndoorZoneFormDialog';

const SiteIndoorZoneListPage = () => {
  const { id } = usePathParams<SitePagePathParams>();

  const { data: site } = useQuery(['SITES/SITE_ZONES', id], () => fetchSiteOutdoorZoneList(id));

  const {
    data: indoorZoneList = [],
    isLoading,
    isFetching,
  } = useQuery(['SITES/SITE_INDOOR_ZONES', id], () => fetchSiteIndoorZoneList(id));

  return (
    <>
      <CircularProgress display={isLoading} />
      <TopbarProgress display={!isLoading && isFetching} />
      {!isLoading && <SiteIndoorZoneListView data={indoorZoneList} allZones={site?.zones} />}
      <SiteIndoorZoneListToolbar name={site?.name} />
      <SiteIndoorZoneDeleteDialog />
      <SiteIndoorZoneFormDialog allZones={site?.zones} />
    </>
  );
};

export default SiteIndoorZoneListPage;
