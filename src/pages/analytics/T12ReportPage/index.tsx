import T12ReportPageView from './T12ReportPageView';
import T12ReportToolbar from './T12ReportToolbar';
import T12ReportFilterbar from './T12ReportFilterbar';
import HelpDialog from './HelpDialog';

const T12ReportPage = () => {
  return (
    <>
      <T12ReportToolbar />
      <T12ReportFilterbar />
      <T12ReportPageView />
      <HelpDialog />
    </>
  );
};

export default T12ReportPage;
