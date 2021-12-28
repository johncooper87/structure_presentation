import { http, notify } from 'utils';

async function createSite({ values }: SiteSubmitData) {
  const {
    name,
    address,
    archive,
    contacts = [],
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
  const body: SitePostBody = {
    // @ts-expect-error
    subContractors: [],
    name,
    enterprise: enterpriseId,
    attributes: {
      timeZone,
      addr: address,
      status: archive ? 'False' : 'True',
      sigurObject: hasTurnstiles ? 'True' : 'False',
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

  const { result }: { result: { zoneGroupId: string } } = await http.post('/api/kbi/construction-site', body, {
    onSuccess: () => {
      if (!hasTurnstiles) notify.success('Объект успешно добавлен');
    },
    onError: () => notify.error('Не удалось добавить объект'),
  });

  if (hasTurnstiles && result.zoneGroupId) {
    const sigurCredentialsBody = {
      siteId: result.zoneGroupId,
      siteName: name,
      ...sigurCredentials,
      port: Number(sigurCredentials.port),
    };
    await http.post(
      '/api/kbi/sigurobject/insertsigurbase',
      sigurCredentialsBody,
      {
        onSuccess: () => notify.success('Объект успешно добавлен'),
        onError: () => notify.error('Не удалось добавить доступ к БД '),
      }
    );
  }
}

export default createSite;
