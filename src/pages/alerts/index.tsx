import AlertListPageView from './AlertListPageView';
import AlertListToolbar from './AlertListToolbar';
import AlertListFilterbar from './AlertListFilterbar';
import AlertListItemMenu from './AlertListItemMenu';
import AlertDialog from './AlertDialog';

const AlertListPage = () => {
  return (
    <>
      <AlertListToolbar />
      <AlertListFilterbar />
      <AlertListPageView />
      <AlertListItemMenu />
      <AlertDialog />
    </>
  );
};

export default AlertListPage;
