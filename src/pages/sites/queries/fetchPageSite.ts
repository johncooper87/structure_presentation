import { http, notify } from 'utils';

const mainContactPersonFields =
  'main_cperson_eaddress,main_cperson_fio,main_cperson_phone,main_cperson_position';
const secondContactPersonFields =
  'second_cperson_eaddress,second_cperson_fio,second_cperson_phone,second_cperson_position';
const fields = `enterprise[enterprise[id,name]],zoneGroup[name,attributes[addr,status,timeZone,sigurObject,${mainContactPersonFields},${secondContactPersonFields}, sendAlertPhone, alertPhone, sendAlertEmail, alertEmail]]`;

async function fetchPageSite(id: string) {
  const { result }: APIResponse<SiteDTO> = await http.get(
    `/api/kbi/construction-site/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить объект') }
  );
  const {
    zoneGroup: { name, attributes, zones },
    enterprise: { enterprise },
  } = result;
  const {
    addr,
    main_cperson_eaddress,
    main_cperson_fio,
    main_cperson_phone,
    main_cperson_position,
    second_cperson_eaddress,
    second_cperson_fio,
    second_cperson_phone,
    second_cperson_position,
    status,
    sigurObject,
    timeZone,
    sendAlertPhone,
    alertPhone,
    sendAlertEmail,
    alertEmail,
  } = attributes;
  const contactPerson1: ContactPerson = {
    name: main_cperson_fio,
    position: main_cperson_position,
    phone: main_cperson_phone,
    email: main_cperson_eaddress,
  };
  const contactPerson2: ContactPerson = {
    name: second_cperson_fio,
    position: second_cperson_position,
    phone: second_cperson_phone,
    email: second_cperson_eaddress,
  };
  const contacts = [
    Object.values(contactPerson1).some(_ => _) ? contactPerson1 : undefined,
    Object.values(contactPerson2).some(_ => _) ? contactPerson2 : undefined,
  ].filter(_ => _);

  const informingContacts = [];
  if (sendAlertPhone === 'true') {
    informingContacts.push({ informingType: 'phone', phone: alertPhone });
  }
  if (sendAlertEmail === 'true') {
    informingContacts.push({ informingType: 'email', email: alertEmail });
  }

  const hasTurnstiles = sigurObject === 'True';

  const sigurCredentials = hasTurnstiles
    ? await http.get(
      `/api/kbi/sigurobject/getsigurbase?siteId=${id}`,
      null,
      { onError: () => notify.error('Не удалось получить данные для доступа к БД') }
    )
    : undefined;

  return {
    id,
    name,
    address: addr,
    archive: status === 'False',
    contacts,
    timeZone,
    enterpriseId: enterprise.id,
    hasTurnstiles,
    sigurCredentials,
    informingContacts,
  } as SiteFormValues;
}

export default fetchPageSite;
