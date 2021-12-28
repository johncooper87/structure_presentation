import { Route } from 'react-router-dom';
import SiteDeleteDialog from './SiteDeleteDialog';
import SiteListPage from './SiteListPage';
import SitePage from './SitePage';

const SitesRouting = () => {
  return (
    <>
      <Route exact path="/sites" component={SiteListPage} />
      <Route exact path="/sites/:id/(edit)?/:tab?/(edit)?" component={SitePage} />
      <SiteDeleteDialog />
    </>
  );
};

export default SitesRouting;
