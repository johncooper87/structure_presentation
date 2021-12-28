import { http, notify } from 'utils';

async function fetchSiteSubcontractorList(siteId: string) {
  const { result }: APIResponse<Subcontractor[]> = await http.get(
    `/api/kbi/construction-site/getsubcontractors?zoneGroupId=${siteId}`,
    {},
    { onError: () => notify.error('Не удалось получить список субподрядчиков') }
  );
  return result;
}

export default fetchSiteSubcontractorList;
