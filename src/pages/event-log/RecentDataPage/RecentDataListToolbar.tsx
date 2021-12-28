import { TopbarTitle, TopbarSearch, Toolbar, ToolbarItem } from 'components';
import { downloadFile, getQueryParams, refetchActiveQuery, http, notify } from 'utils';

const refresh = () => refetchActiveQuery('EVENT_LOG/RECENT_DATA');

async function handleDownload() {
  const params = getQueryParams() as RecentDataListPageQueryParams;
  if (Object.keys(params).length === 0) return;
  const { enterpriseId, constructionSiteId, workerId } = params;
  const file: File = await http.get(
    '/api/kbi/eventlog/getreportlastevetdevices',
    {
      enterpriseId,
      zoneGroupId: constructionSiteId,
      workerId,
    },
    {
      onError: () => notify.error('Не удалось получить отчет по оперативным данным'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

function RecentDataListToolbar() {
  return (
    <>
      <TopbarTitle>Оперативные данные</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>
    </>
  );
}

export default RecentDataListToolbar;
