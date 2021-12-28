import HistoryListPageView from './HistoryListPageView';
import HistoryListToolbar from './HistoryListToolbar';
import HistoryListFilterbar from './HistoryListFilterbar';

const HistoryListPage = () => {
  return (
    <>
      <HistoryListToolbar />
      <HistoryListFilterbar />
      <HistoryListPageView />
    </>
  );
};

export default HistoryListPage;
