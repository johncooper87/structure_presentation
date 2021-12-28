type EnterpriseListPageQueryParams = ListViewQueryParams &
  Partial<{
    status: 'archive' | 'any';
    name: string;
    address: string;
    orderBy: 'name' | 'address' | 'totalSites' | 'totalWorkers';
  }>;

interface ContactPerson {
  name: string;
  position: string;
  phone: string;
  email: string;
}

interface EnterpriseFormValues {
  id: string;
  TIN: string; // Taxpayer Identification Number (ИНН)
  PSRN: string; // Primary State Registration Number (ОГРН)
  name: string;
  address: string;
  archive: boolean;
  contacts: ContactPerson[];
}

type EnterpriseSubmitData = SubmitData<EnterpriseFormValues>;

interface EnterprisePostBody {
  name: string;
  attributes: {
    addr: string;
    inn: string;
    ogrn: string;
    main_cperson_eaddress: string;
    main_cperson_fio: string;
    main_cperson_phone: string;
    main_cperson_position: string;
    second_cperson_eaddress: string;
    second_cperson_fio: string;
    second_cperson_phone: string;
    second_cperson_position: string;
    status: EnterpriseStatus;
  };
}

type EnterprisePutBody = EnterprisePostBody;
