import { http, notify } from 'utils';

async function createEnterprise({ values }: EnterpriseSubmitData) {
  const { TIN, name, PSRN, address, archive, contacts = [] } = values;
  const body: EnterprisePostBody = {
    name,
    attributes: {
      addr: address,
      inn: TIN,
      ogrn: PSRN,
      status: archive ? 'False' : 'True',
      main_cperson_eaddress: contacts[0]?.email || '',
      main_cperson_fio: contacts[0]?.name || '',
      main_cperson_phone: contacts[0]?.phone || '',
      main_cperson_position: contacts[0]?.position || '',
      second_cperson_eaddress: contacts[1]?.email || '',
      second_cperson_fio: contacts[1]?.name || '',
      second_cperson_phone: contacts[1]?.phone || '',
      second_cperson_position: contacts[1]?.position || '',
    },
  };

  await http.post('/api/kbi/enterprises', body, {
    onSuccess: () => notify.success('Компания успешно добавлена'),
    onError: () => notify.error('Не удалось добавить компанию'),
  });
}

export default createEnterprise;
