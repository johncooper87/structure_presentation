import { http, notify } from 'utils';

const mainContactPersonFields =
  'main_cperson_eaddress,main_cperson_fio,main_cperson_phone,main_cperson_position';
const secondContactPersonFields =
  'second_cperson_eaddress,second_cperson_fio,second_cperson_phone,second_cperson_position';
const fields = `name,attributes[addr,inn,ogrn,status,${mainContactPersonFields},${secondContactPersonFields}]`;

async function fetchPageEnterprise(id: string) {
  const { result }: APIResponse<Enterprise> = await http.get(
    `/api/enterprises/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить компанию') }
  );
  const { name, attributes } = result;
  const {
    addr,
    inn,
    ogrn,
    main_cperson_eaddress,
    main_cperson_fio,
    main_cperson_phone,
    main_cperson_position,
    second_cperson_eaddress,
    second_cperson_fio,
    second_cperson_phone,
    second_cperson_position,
    status,
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
  return {
    id,
    TIN: inn,
    name,
    PSRN: ogrn,
    address: addr,
    archive: status === 'False',
    contacts,
  } as EnterpriseFormValues;
}

export default fetchPageEnterprise;
