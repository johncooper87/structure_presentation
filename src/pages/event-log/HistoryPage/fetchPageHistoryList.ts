import { addDays } from 'date-fns';
import { http, notify } from 'utils';

async function fetchPageHistoryList({
  start,
  end,
  workerId,
  constructionSiteId,
}: HistoryRequestParams) {
  const { result }: APIResponse<HistoryDTO[]> = await http.post(
    '/api/kbi/eventlog/history',
    {
      constructionId: workerId ? undefined : constructionSiteId,
      workerId,
      dateBegin: new Date(start),
      dateEnd: addDays(new Date(end), 1),
    },
    { onError: () => notify.error('Не удалось получить историю событий') }
  );
  return result || [];
}

export default fetchPageHistoryList;
