import { http, notify } from 'utils';

async function createUser({ values }: UserSubmitData) {
  const {
    lastname,
    firstname,
    middlename,
    gender,
    birthdate,
    phone,
    photo,
    enterpriseId,
    roleId,
    username,
    email,
    blocked,
    constructionSiteIds,
  } = values;
  const body: UserPutBody = {
    photo: photo instanceof File ? photo : undefined,
    param: {
      fullName: [lastname, firstname, middlename].filter(_ => _).join(' '),
      enterprise: enterpriseId,
      role: roleId.toString(),
      login: username,
      isBanned: blocked,
      phoneNumber: phone,
      eMail: email,
      attributes: {
        gender: (gender === 'male' && '0') || (gender === 'female' && '1') || undefined,
        birthday: birthdate,
        construction_ids: constructionSiteIds?.join(';'),
      },
    },
  };

  await http.post('/api/kbi/users', body, {
    contentType: 'FormData',
    onSuccess: () => notify.success('Пользователь успешно добавлен'),
    onError: () => notify.error('Не удалось добавить пользователя'),
  });
}

export default createUser;
