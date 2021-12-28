import { http, notify } from 'utils';

async function updateSiteSubcontactors(
  constructionSiteId: string,
  { values }: SiteSubcontractorsSubmitData
) {
  const { enterpriseIds } = values;
  const body: SiteSubcontractorsPostBody = {
    zoneGroupId: constructionSiteId,
    enterpriseIds,
  };

  await http.post(`/api/kbi/construction-site/newsubcontractors`, body, {
    onSuccess: () => notify.success('Список субподрядчиков успешно обновлен'),
    onError: () => notify.error('Не удалось обновить список субподрядчиков'),
  });
}

export default updateSiteSubcontactors;
