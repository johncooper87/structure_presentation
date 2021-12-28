import { addDays } from 'date-fns';
import { TopbarTitle, TopbarSearch, Toolbar, ToolbarItem } from 'components';
import { downloadFile, getQueryParams, refetchActiveQuery, http, notify } from 'utils';

const refresh = () => refetchActiveQuery('EVENT_LOG/HISTORY');

async function handleDownload() {
  const params = getQueryParams() as HistoryListPageQueryParams;
  const { start, end, workerId, constructionSiteId } = params;
  if (Object.keys(params).length === 0) return;
  const file: File = await http.post(
    '/api/kbi/eventlog/getreporthistoryevetdevices',
    {
      constructionId: workerId ? undefined : constructionSiteId,
      workerId,
      dateBegin: new Date(start),
      dateEnd: addDays(new Date(end), 1),
    },
    {
      onError: () => notify.error('Не удалось получить отчет по истории событий'),
    }
  );
  if (!file) return;
  downloadFile(file, file.name);
}

function HistoryListToolbar() {
  return (
    <>
      <TopbarTitle>История событий</TopbarTitle>
      <TopbarSearch />
      <Toolbar>
        <ToolbarItem template="filter" />
        <ToolbarItem template="refresh" onClick={refresh} />
        <ToolbarItem template="download" onClick={handleDownload} />
      </Toolbar>
    </>
  );
}

export default HistoryListToolbar;
