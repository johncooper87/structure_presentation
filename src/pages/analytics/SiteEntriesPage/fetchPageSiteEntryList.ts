import { addDays } from 'date-fns';
import { http, notify } from 'utils';

async function fetchPageSiteEntryList({
  start,
  end,
  enterpriseId,
  workerId,
  constructionSiteId,
}: SiteEntriesRequestParams) {
  const { result }: APIResponse<SiteEntryReport[]> = await http.post(
    '/api/kbi/analytic/workerentriesreport',
    {
      constructionId: constructionSiteId,
      enterpriseId,
      workerId,
      begin: new Date(start),
      end: addDays(new Date(end), 1),
    },
    { onError: () => notify.error('Не удалось получить отчет по вхождениям на объекты') }
  );
  return result?.[0];
}

export default fetchPageSiteEntryList;
