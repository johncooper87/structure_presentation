import { Route } from 'react-router-dom';
import HistoryPage from './HistoryPage';
import RecentDataPage from './RecentDataPage';

const EventLogRouting = () => {
  return (
    <>
      <Route exact path="/event-log/history" component={HistoryPage} />
      <Route exact path="/event-log/recent-data" component={RecentDataPage} />
    </>
  );
};

export default EventLogRouting;
