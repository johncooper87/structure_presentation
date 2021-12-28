import { Route } from 'react-router-dom';
import SiteEntriesPage from './SiteEntriesPage';
import WorkTimePage from './WorkTimePage';
import T12ReportPage from './T12ReportPage';
import ZoneEntries from './ZoneEntries';

const AnalyticsRouting = () => {
  return (
    <>
      <Route exact path="/analytics/site-entries" component={SiteEntriesPage} />
      <Route exact path="/analytics/work-time" component={WorkTimePage} />
      <Route exact path="/analytics/t12report" component={T12ReportPage} />
      <Route exact path="/analytics/zone-entries" component={ZoneEntries} />
    </>
  );
};

export default AnalyticsRouting;
