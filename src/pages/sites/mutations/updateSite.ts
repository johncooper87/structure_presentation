import { http, notify } from 'utils';
import deepEqual from 'utils/deepEqual';

async function updateSite(id: string, { values, initialValues }: SiteSubmitData) {
  const {
    name,
    address,
    archive,
    contacts,
    timeZone,
    enterpriseId,
    hasTurnstiles,
    sigurCredentials,
    informingContacts,
  } = values;
  const informingData = informingContacts.reduce((acc, currValue) => {
    if (currValue?.informingType === 'email') {
      return ({ ...acc, sendAlertEmail: 'true', alertEmail: currValue?.email });
    }
    if (currValue?.informingType === 'phone') {
      return ({ ...acc, sendAlertPhone: 'true', alertPhone: currValue?.phone });
    }
    return acc;
  }, {});
  const body: SitePutBody = {
    // @ts-expect-error
    subContractors: [],
    name,
    enterprise: enterpriseId,
    attributes: {
      sigurObject: hasTurnstiles ? 'True' : 'False',
      addr: address,
      timeZone,
      status: archive ? 'False' : 'True',
      main_cperson_eaddress: contacts[0]?.email || '',
      main_cperson_fio: contacts[0]?.name || '',
      main_cperson_phone: contacts[0]?.phone || '',
      main_cperson_position: contacts[0]?.position || '',
      second_cperson_eaddress: contacts[1]?.email || '',
      second_cperson_fio: contacts[1]?.name || '',
      second_cperson_phone: contacts[1]?.phone || '',
      second_cperson_position: contacts[1]?.position || '',
      ...informingData,
    },
  };

  const sigurCredentialsUpdated = hasTurnstiles
    && !deepEqual(sigurCredentials, initialValues.sigurCredentials);

  await http.put(`/api/kbi/construction-site/${id}`, body, {
    onSuccess: () => {
      if (!sigurCredentialsUpdated) notify.success('Информация об объекте успешно обновлена');
    },
    onError: () => notify.error('Не удалось обновить информацию об объекте'),
  });

  if (sigurCredentialsUpdated) {
    const sigurCredentialsBody = {
      siteName: name,
      ...sigurCredentials,
      port: Number(sigurCredentials.port),
    };
    if (!sigurCredentialsBody.password) delete sigurCredentialsBody.password;
    await http.put(
      `/api/kbi/sigurobject/updatesigurbase?id=${sigurCredentials.id}`,
      sigurCredentialsBody,
      {
        onSuccess: () => notify.success('Информация об объекте успешно обновлена'),
        onError: () => notify.error('Не удалось обновить доступ к БД '),
      }
    );
  }
}

export default updateSite;
