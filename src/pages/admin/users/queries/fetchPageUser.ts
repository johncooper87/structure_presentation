import { http, notify } from 'utils';

const fields =
  'fullName,attributes[birthday,gender,construction_ids],enterprise[id],role[id],eMail,hasPhoto,login,phoneNumber,isBanned';

async function fetchPageUser(id: string) {
  const { result }: APIResponse<UserDTO> = await http.get(
    `/api/kbi/users/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить пользователя') }
  );
  const { fullName, attributes, enterprise, role, hasPhoto, phoneNumber, eMail, login, isBanned } =
    result;
  const { birthday, gender, construction_ids } = attributes;
  const [lastname, firstname, middlename] = fullName.split(' ');

  return {
    id,
    username: login,
    lastname,
    firstname,
    middlename,
    gender: gender === '0' ? 'male' : 'female',
    birthdate: birthday,
    phone: phoneNumber,
    photo: hasPhoto ? `/api/kbi/users/${id}/photo` : undefined,
    enterpriseId: enterprise?.id,
    roleId: role.id,
    email: eMail,
    blocked: isBanned,
    constructionSiteIds: construction_ids?.split(';'),
  } as UserFormValues;
}

export default fetchPageUser;
