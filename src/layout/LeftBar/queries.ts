import { http, notify } from 'utils';

const fields = `enterprise[enterprise[id,name]],zoneGroup[name,attributes[addr,status,timeZone,sigurObject]]`;
async function fetchPageSiteList() {
  const { result }: APIResponse<SiteDTO[]> = await http.get(
    '/api/kbi/construction-site',
    { fields },
    {
      onError: () => notify.error('Не удалось получить список объектов пользователя'),
    }
  );
  return result;
}

export { fetchPageSiteList };
