import { format } from 'date-fns';
import { http, notify } from 'utils';

async function fetchPageWorkTimeList({
  start,
  end,
  enterpriseId,
  workerId,
  constructionSiteId,
}: WorkTimeReportRequestParams) {
  const { result }: APIResponse<WorkTimeEntry[]> = await http.post(
    '/api/kbi/analytic/timetrackingreport',
    {
      constructionId: constructionSiteId,
      enterpriseId,
      workerId,
      begin: format(new Date(start), 'yyyy-MM-dd'),
      end: format(new Date(end), 'yyyy-MM-dd'),
    },
    { onError: () => notify.error('Не удалось получить отчет учета рабочего времени') }
  );
  return result;
}

export default fetchPageWorkTimeList;
