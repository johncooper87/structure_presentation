import { http, notify } from 'utils';

const fields =
  'fullName,attributes[birthday,citizenship,gender,insurance,isStationary,passport,photo,construction_name,mobject],enterprise[id],profession[id]';

type WorkerGetResult = Omit<WorkerDTO, 'builds' | 'device'> & {
  attributes: {
    construction_name?: string;
    mobject?: string;
  };
};

async function fetchPageWorker(id: string) {
  const { result }: APIResponse<WorkerGetResult> = await http.get(
    `/api/workers/${id}`,
    { fields },
    { onError: () => notify.error('Не удалось получить сотрудника') }
  );
  const { fullName, attributes, enterprise, profession } = result;
  const {
    birthday,
    citizenship,
    gender,
    insurance,
    isStationary,
    passport,
    construction_name,
    photo,
    mobject,
  } = attributes;
  const [lastname, firstname, middlename] = fullName.split(' ');
  return {
    id,
    lastname,
    firstname,
    middlename,
    gender: gender === '0' ? 'male' : 'female',
    citizenship,
    birthdate: birthday,
    insuranceNumber: insurance,
    passport: passport?.[4] === ' ' ? passport.slice(0, 4) + ' ' + passport.slice(4) : passport,
    photo: photo ? `/api/kbi/workers/${id}/photo` : undefined,
    enterpriseId: enterprise?.id,
    siteIds: construction_name?.split(' '),
    positionId: profession.id,
    stationary: isStationary === '1',
    deviceId: mobject,
  } as WorkerFormValues;
}

export default fetchPageWorker;
