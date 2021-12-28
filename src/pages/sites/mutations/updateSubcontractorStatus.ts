import { http, notify } from 'utils';

async function updateSubcontractorStatus(
  constructionSiteId: string,
  enterpriseId: string,
  active: boolean
) {
  const body: SiteSubcontractorsStatusPutBody = {
    zoneGroupId: constructionSiteId,
    enterpriseId,
    isActive: active,
  };

  await http.put(`/api/kbi/construction-site/togglesubcontractor`, body, {
    onSuccess: () => notify.success('Стаутс субподрядчика был успешно изменен'),
    onError: () => notify.error('Не удалось изменить статус субподрядчика'),
  });
}

export default updateSubcontractorStatus;
