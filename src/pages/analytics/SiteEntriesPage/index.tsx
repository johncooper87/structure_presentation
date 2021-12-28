import SiteEntryListPageView from './SiteEntryListPageView';
import SiteEntryListToolbar from './SiteEntryListToolbar';
import SiteEntryListFilterbar from './SiteEntryListFilterbar';

const SiteEntryListPage = () => {
  return (
    <>
      <SiteEntryListToolbar />
      <SiteEntryListFilterbar />
      <SiteEntryListPageView />
    </>
  );
};

export default SiteEntryListPage;
