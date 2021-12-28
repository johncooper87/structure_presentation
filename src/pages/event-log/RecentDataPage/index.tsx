import RecentDataListPageView from './RecentDataListPageView';
import RecentDataListToolbar from './RecentDataListToolbar';
import RecentDataListFilterbar from './RecentDataListFilterbar';

const RecentDataListPage = () => {
  return (
    <>
      <RecentDataListToolbar />
      <RecentDataListFilterbar />
      <RecentDataListPageView />
    </>
  );
};

export default RecentDataListPage;
