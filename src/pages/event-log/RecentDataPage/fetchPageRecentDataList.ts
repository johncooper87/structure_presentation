import { http, notify } from 'utils';

async function fetchPageRecentDataList({
  enterpriseId,
  workerId,
  constructionSiteId,
}: RecentDataRequestParams) {
  let fields;
  if (workerId) {
    fields = `shift[workerId=${workerId},*],*`;
  } else if (constructionSiteId) {
    fields = `projects[id=${constructionSiteId},*],*`;
  } else if (enterpriseId) {
    fields = `companyId=${enterpriseId},*`;
  }
  const { result }: APIResponse<RecentDataDTO[]> = await http.get(
    '/api/kbi/eventlog',
    {
      fields,
    },
    { onError: () => notify.error('Не удалось получить историю событий') }
  );
  return result || [];
}

export default fetchPageRecentDataList;
