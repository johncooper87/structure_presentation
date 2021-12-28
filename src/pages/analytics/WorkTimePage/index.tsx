import WorkTimeListPageView from './WorkTimeListPageView';
import WorkTimeListToolbar from './WorkTimeListToolbar';
import WorkTimeListFilterbar from './WorkTimeListFilterbar';

const WorkTimeListPage = () => {
  return (
    <>
      <WorkTimeListToolbar />
      <WorkTimeListFilterbar />
      <WorkTimeListPageView />
    </>
  );
};

export default WorkTimeListPage;
