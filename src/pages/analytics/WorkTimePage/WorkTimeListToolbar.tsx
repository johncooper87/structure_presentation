import { TopbarTitle, TopbarSearch, Toolbar, ToolbarItem } from 'components';
import { downloadFile, getQueryParams, refetchActiveQuery, http, notify } from 'utils';

const refresh = () => refetchActiveQuery('ANALITICS/WORK_TIME');

async function handleDownload() {
  const { start, constructionSiteId, ...params } =
    getQueryParams() as unknown as WorkTimeReportRequestParams;
  if (Object.keys(params).length === 0) return;
  const file: File = await http.post(
    '/api/kbi/analytic/timetrackingreportexcel',
    { ...params, constructionId: constructionSiteId, begin: start },
    {
      onError: () => notify.error('Не удалось получить отчет по учету рабочего времени'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

function WorkTimeListToolbar() {
  return (
    <>
      <TopbarTitle>Учет рабочего времени</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>
    </>
  );
}

export default WorkTimeListToolbar;
