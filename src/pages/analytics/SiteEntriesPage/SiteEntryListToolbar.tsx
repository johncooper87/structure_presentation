import { TopbarTitle, TopbarSearch, Toolbar, ToolbarItem } from 'components';
import { downloadFile, getQueryParams, refetchActiveQuery, http, notify } from 'utils';

const refresh = () => refetchActiveQuery('ANALITICS/SITE_ENTRIES');

async function handleDownload() {
  const params = getQueryParams() as HistoryListPageQueryParams;
  const { start, constructionSiteId, ...restParams } = params;
  if (Object.keys(params).length === 0) return;
  const file: File = await http.post(
    '/api/kbi/analytic/workerentriesreportexcel',
    {
      constructionId: constructionSiteId,
      ...restParams,
      begin: start,
    },
    {
      onError: () => notify.error('Не удалось получить отчет по вхождению на объекты'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

function SiteEntryListToolbar() {
  return (
    <>
      <TopbarTitle>Отчет по вхождению на объекты</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>
    </>
  );
}

export default SiteEntryListToolbar;
