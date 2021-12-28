import { http, notify } from 'utils';
import { lastDayOfMonth } from 'date-fns';

async function fetchT12ReportData({
  enterpriseId,
  constructionSiteId,
  workerId,
  date,
}: T12ReportPageQueryParams) {
  const begin = date.slice(0, 7) + '-01';
  const end = date.slice(0, 7) + '-' + lastDayOfMonth(new Date(date)).getDate();
  const { result }: APIResponse<any[]> = await http.post(
    '/api/kbi/analytic/formt12report',
    {
      enterpriseId,
      constructionId: constructionSiteId,
      workerId,
      begin,
      end,
    },
    { onError: () => notify.error('Не удалось получить отчет Т12') }
  );

  return result;
}

export default fetchT12ReportData;
