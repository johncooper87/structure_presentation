import SubcontractorsIcon from '@material-ui/icons/Business';
import OutdoorIcon from '@material-ui/icons/Crop';
import CommonIcon from '@material-ui/icons/InfoOutlined';
import IndoorIcon from '@material-ui/icons/MeetingRoomOutlined';
import { BarTab, BarTabs } from 'components';
import { useFormPageMode, usePathTabs } from 'hooks';
import fetchPageSite from '../queries/fetchPageSite';
import SiteIndoorZoneListPage from './SiteSubpages/SiteIndoorZoneListPage';
import SiteInfoPage from './SiteSubpages/SiteInfoPage';
import SiteOutdoorZoneListPage from './SiteSubpages/SiteOutdoorZoneListPage';
import SiteSubcontractorListPage from './SiteSubpages/SiteSubcontractorListPage';

const commonIcon = <CommonIcon />;
const outdoorIcon = <OutdoorIcon />;
const indoorIcon = <IndoorIcon />;
const subcontractorsIcon = <SubcontractorsIcon />;

interface SitePagePathParams {
  id: string;
}

const SitePage = () => {
  const { id } = usePathParams<SitePagePathParams>();
  const formMode = useFormPageMode();
  const readingMode = formMode === 'read';

  const [tab, handleTabChange] = usePathTabs('/sites/' + id);

  const { data }: { data: SiteFormValues } = useQuery(
    ['SITES/SITE', id],
    () => fetchPageSite(id),
    { enabled: formMode !== 'create' }
  );

  const hasTurnstiles = data?.hasTurnstiles;
  const turnstilesStyle = data == null || hasTurnstiles ? { display: 'none' } : undefined;

  return (
    <>
      {readingMode && (
        <BarTabs value={tab} onChange={handleTabChange}>
          <BarTab label="Общее" value="" icon={commonIcon} />
          <BarTab label="Зоны" value="outdoor-zones" icon={outdoorIcon} />
          <BarTab style={turnstilesStyle} label="Помещения" value="indoor-zones" icon={indoorIcon} />
          <BarTab style={turnstilesStyle} label="Субподрядчики" value="subcontractors" icon={subcontractorsIcon} />
        </BarTabs>
      )}
      {tab === '' && <SiteInfoPage />}
      {tab === 'outdoor-zones' && <SiteOutdoorZoneListPage />}
      {tab === 'indoor-zones' && <SiteIndoorZoneListPage />}
      {tab === 'subcontractors' && <SiteSubcontractorListPage />}
    </>
  );
};

export default SitePage;
