interface ZoneGroup {
  id: string;
  name: string;
  zones: Zone[];
  attributes: {
    sigurObject: 'True' | 'False';
  };
}

type EnterpriseStatus = 'True' | 'False';

interface Enterprise {
  id: string;
  name: string;
  displayName: string;
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

interface EnterpriseDTO {
  enterprise: Enterprise;
  objCount: number;
  workerCount: number;
}

interface Worker {
  id: string;
  fullName: string;
}

interface ConstructionSite {
  id: string;
  name: string;
}

interface ConstructionSiteDTO {
  zoneGroup: ZoneGroup;
  enterprise: EnterpriseDTO & {
    workers: Worker[];
  };
}

interface DeviceModel {
  id: string;
  name: DeviceName;
  displayName: DeviceName;
}

type DeviceStatus = 'True' | 'False' | 'true' | 'false';

interface DeviceDTO {
  id: string;
  gpsAddr: string;
  model: DeviceModel;
  enterprise?: Enterprise;
  worker?: Worker;
  constructionSites: ConstructionSite[];
  attributes: {
    status?: DeviceStatus;
  };
}

interface Device {
  id: string;
  name: string;
  model: Partial<DeviceModel>;
}

interface Profession {
  id: string;
  displayName: string;
  name: string;
}

type Gender = '0' | '1';
type WorkerStationarity = '0' | '1';

interface WorkerDTO {
  id: string;
  fullName: string;
  enterprise?: Enterprise;
  builds?: ConstructionSite[];
  device?: Device;
  profession: Profession;
  attributes: {
    photo?: string;
    gender: Gender;
    citizenship?: string;
    birthday: string;
    isStationary: WorkerStationarity;
    passport?: string;
    insurance?: string;
  };
}

type LngLat = [lng: number, lat: number];

interface ZoneState {
  deleted: boolean;
  centroid: LngLat;
  points: LngLat[];
}

type ZoneColor = [red: number, green: number, blue: number, alpha: number];

interface Zone {
  id: string;
  color: ZoneColor;
  displayName: string;
  name: string;
  deleted: boolean;
  states: ZoneState[];
}
