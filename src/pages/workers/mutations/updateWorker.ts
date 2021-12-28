import { http, notify } from 'utils';

async function updateWorker(id: string, { values }: WorkerSubmitData) {
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
  const body: WorkerPutBody = {
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

  await http.put(`/api/kbi/workers/${id}`, body, {
    contentType: 'FormData',
    onSuccess: () => notify.success('Информация о сотруднике успешно обновлена'),
    onError: () => notify.error('Не удалось обновить информацию о сотруднике'),
  });
}

export default updateWorker;
