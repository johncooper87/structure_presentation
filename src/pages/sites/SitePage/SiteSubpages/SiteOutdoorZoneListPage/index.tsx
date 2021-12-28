import { CircularProgress, TopbarProgress } from 'components';
import { getQueryData } from 'utils';

import fetchSiteOutdoorZoneList from '../../../queries/fetchSiteOutdoorZoneList';
import SiteOutdoorZoneListToolbar from './SiteOutdoorZoneListToolbar';
import SiteOutdoorZoneListView from './SiteOutdoorZoneListView';
import SiteOutdoorZoneDeleteDialog from './SiteOutdoorZoneDeleteDialog';
import SiteOutdoorZoneFormDialog from './SiteOutdoorZoneFormDialog';

const SiteOutdoorZoneListPage = () => {
  const { id } = usePathParams<SitePagePathParams>();

  const initialData = getQueryData('SITES/SITE', id) as ZoneGroup;
  const {
    data: site,
    isLoading,
    isFetching,
  } = useQuery(['SITES/SITE_ZONES', id], () => fetchSiteOutdoorZoneList(id), {
    initialData,
  });

  return (
    <>
      <CircularProgress display={isLoading} />
      <TopbarProgress display={!isLoading && isFetching} />
      {!isLoading && <SiteOutdoorZoneListView data={site?.zones} />}
      <SiteOutdoorZoneListToolbar name={site?.name} />
      <SiteOutdoorZoneDeleteDialog />
      <SiteOutdoorZoneFormDialog allZones={site?.zones} />
    </>
  );
};

export default SiteOutdoorZoneListPage;
