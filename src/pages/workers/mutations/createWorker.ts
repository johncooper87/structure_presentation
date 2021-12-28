import { http, notify } from 'utils';

async function createWorker({ values }: WorkerSubmitData) {
  const {
    lastname,
    firstname,
    middlename,
    gender,
    citizenship,
    birthdate,
    insuranceNumber,
    passport,
    photo,
    enterpriseId,
    siteIds,
    positionId,
    stationary,
    comment,
    deviceId,
  } = values;
  const body: WorkerPostBody = {
    photo: photo instanceof File ? photo : undefined,
    param: {
      name: firstname,
      fullName: [lastname, firstname, middlename].filter(_ => _).join(' '),
      enterprise: enterpriseId,
      profession: positionId.toString(),
      device: deviceId,
      attributes: {
        gender: gender === 'male' ? '0' : '1',
        construction_name: siteIds?.join(' '),
        birthday: birthdate,
        citizenship,
        insurance: insuranceNumber,
        passport,
        isStationary: stationary ? '1' : '0',
        comment,
      },
    },
  };

  await http.post('/api/kbi/workers', body, {
    contentType: 'FormData',
    onSuccess: () => notify.success('Сотрудник успешно добавлен'),
    onError: () => notify.error('Не удалось добавить сотрудника'),
  });
}

export default createWorker;
