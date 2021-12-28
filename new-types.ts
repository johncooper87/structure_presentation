type T12ReportData = {
  worker: {
    fullname: string;
    personnelNumber: string;
    position: string;
  }
  attendance: {
    kind: 'Я' | 'Н' | 'В' | 'РВ' | 'НН';
    duration: string; // hh:mm
    start: string;
    end: string;
  }[];
  hoursInFirstHalf: string;
  hoursInSecondHalf: string;
  workedInTotal: {
    totalDays: number;
    totalHours: string;
    daytimeHours: string;
    nightTimeHours: string;
    weekendHours: string;
  }
  wasAbsent: {
    totalDays: number;
    totalHours: string;
  }
  totalWeekend: number;
}[];

interface SiteInput {
  name: string;
  address: string;
  contacts: ContactPerson[];
  archive: boolean;
  timeZone: number;
  latlng: LatLng;
}

interface ContactPerson {
  name: string;
  position: string;
  phone: string;
  email: string;
}

interface SiteDTO {
  id: string;
  name: string;
  address: string;
  contacts: ContactPerson[];
  archive: boolean;
  timeZone: number;
  latlng: LatLng;
}

type LatLng = [lat: number, lng: number];

interface Zone {
  id: string;
  name: string;
  cssStyleColor: string; // [200, 100, 150, 1] =>  'rgba(200, 100, 150, 1)'
  latlngs: LatLng[];
}

// interface ContactPerson {
//   name: string;
//   position: string;
//   phone: string;
//   email: string;
// }

interface EnterpriseInput {
  id: string;
  TIN: string; // Taxpayer Identification Number (ИНН)
  PSRN: string; // Primary State Registration Number (ОГРН)
  name: string;
  address: string;
  archive: boolean;
  contacts: ContactPerson[];
}

interface EnterpriseDTO {
  id: string;
  TIN: string;
  PSRN: string;
  name: string;
  address: string;
  archive: boolean;
  contacts: ContactPerson[];
  totalSites: number;
  totalWorkers: number;
}

interface EnterpriseInfoByTIN {
  name: string;
  PSRN: string;
  address: string;
}

interface WorkerDTO {
  id: string;
  photo?: string;
  lastname: string;
  firstname: string;
  middlename?: string;
  gender: "male" | "female";
  birthdate: string;
  citizenship?: string;
  passport?: string;
  insuranceNumber?: string;
  stationary: boolean;
  enterprise: {
    id: string;
    name: string;
  };
  position: {
    id: string;
    name: string;
  };
  sites: {
    id: string;
    name: string;
  }[];
  device?: {
    id: string;
    serialNumber: string;
  };
}

interface WorkerFormData {
  photo?: File;
  values: {
    id: string;
    lastname: string;
    firstname: string;
    middlename?: string;
    gender: "male" | "female";
    birthdate: string;
    citizenship?: string;
    passport?: string;
    insuranceNumber?: string;
    enterpriseId: string;
    positionId: string;
    stationary: boolean;
    siteIds?: string[];
    deviceId?: string;
  };
}

interface DeviceFilter {
  page?: number;
  pageSize?: number;
  serialNumber?: string;
  type?: 'watch' | 'card';
  archive?: boolean;
  wokrerName?: string;
  enterpriseIds?: string[];
  siteIds?: string[];
  search?: string;
}

interface DeviceType {
  id: string;
  name: string;
  prefix?: string;
}

interface Device {
  id: string;
  typeId: string;
  serialNumber: string;
  archive: boolean;
  worker?: {
    id: string;
    fullname: string;
    enterprise: {
      id: string;
      name: string;
    }
    sites: {
      id: string;
      name: string;
    }[]
  }
}

interface DevicePostBody {
  type: 'watch' | 'card';
  serialNumber: string;
  archive: boolean;
  workerId?: string;
}

// interface Beacon {
//   site: {
//     id: string;
//     name: string;
//   }
//   indoorZone: {
//     id: string;
//     floor: number;
//   }
//   uuid: string;
//   mac: string;
//   major: number;
//   minor: number;
//   latlng: LatLng;
// }

// interface SiteDTO {
//   id: string;
//   name: string;
//   address: string;
//   contacts: ContactPerson[];
//   archival: boolean; // был archive
//   timeZone: number;
//   latlng: LatLng;
//   indoorZones: {
//     id: string;
//     floor: number;
//   }[]
// }

// interface IndoorZone {
//   id: string;
//   floor: string;
//   corners: [LatLng, LatLng, LatLng, LatLng];
// }
