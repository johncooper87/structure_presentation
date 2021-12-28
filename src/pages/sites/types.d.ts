type SiteListPageQueryParams = ListViewQueryParams &
  Partial<{
    status: 'archive' | 'any';
    name: string;
    address: string;
    enterpriseId: string;
    orderBy: 'name' | 'address' | 'totalSites' | 'totalWorkers';
  }>;

interface SitContactPerson {
  name: string;
  position: string;
  phone: string;
  email: string;
}

interface UserInformingFormValue {
  informingType: string;
  email?: string;
  phone?: string;
}

interface SiteFormValues {
  id: string;
  name: string;
  address: string;
  archive: boolean;
  hasTurnstiles: boolean;
  contacts: SitContactPerson[];
  enterpriseId: string;
  timeZone: string;
  polygons: Polygon[];
  sigurCredentials: {
    address: string;
    port: number;
    login: string;
    password: string;
    databaseMain: string;
    databaseLog: string;
    id: number;
  };
  informingContacts?: UserInformingFormValue[];
}

type SiteSubmitData = SubmitData<SiteFormValues>;

interface SitePostBody {
  name: string;
  enterprise: string;
  attributes: {
    addr: string;
    main_cperson_eaddress: string;
    main_cperson_fio: string;
    main_cperson_phone: string;
    main_cperson_position: string;
    second_cperson_eaddress: string;
    second_cperson_fio: string;
    second_cperson_phone: string;
    second_cperson_position: string;
    status: SiteStatus;
    sigurObject: 'True' | 'False';
    timeZone: string;
    sendAlertPhone?: boolean;
    alertPhone?: string;
    sendAlertEmail?: boolean;
    alertEmail?: string;
  };
}

type SitePutBody = SitePostBody;

type SiteStatus = 'True' | 'False';

interface SiteDTO {
  enterprise: {
    enterprise: {
      id: string;
      name: string;
    };
  };
  zoneGroup: {
    id: string;
    name: string;
    parent: {
      name: string;
    };
    zones: Zone[];
    attributes: {
      addr: string;
      main_cperson_eaddress: string;
      main_cperson_fio: string;
      main_cperson_phone: string;
      main_cperson_position: string;
      second_cperson_eaddress: string;
      second_cperson_fio: string;
      second_cperson_phone: string;
      second_cperson_position: string;
      status: SiteStatus;
      timeZone: string;
      enterpriseId: string;
      sigurObject: 'True' | 'False';
      sendAlertPhone?: string;
      alertPhone?: string;
      sendAlertEmail?: string;
      alertEmail?: string;
    };
  };
}

interface SiteOutdoorZoneFormValues {
  name: string;
  color: string;
  features: FeatureGroup;
}

type SiteOutdoorZoneSubmitData = SubmitData<SiteOutdoorZoneFormValues>;

interface SiteOutdoorZonePostBody {
  name: string;
  color: ZoneColor;
  constructionSiteId: string;
  type: 'polygon';
  role: 0;
  state: {
    dateCreate: string;
    type: 1;
    points: LngLat[];
  };
}

type SiteOutdoorZonePutBody = SiteOutdoorZonePostBody;

interface SitePagePathParams {
  id: string;
}

interface SiteIndoorZone {
  constructionSiteId: string;
  floor: number;
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

interface SiteIndoorZoneFormValues {
  image: File;
  floor: string;
  corners: [LatLng, LatLng, LatLng, LatLng];
}

type SiteIndoorZoneSubmitData = SubmitData<SiteIndoorZoneFormValues>;

interface SiteIndoorZonePostBody {
  file: Blob;
  request: {
    ConstructionSiteId: string;
    Floor: number;
    Coordinates: { Latitude: number; Longitude: number }[];
  };
}

interface SiteIndoorZonePutBody {
  file: Blob;
  request: {
    id: string;
    ConstructionSiteId: string;
    Floor: number;
    Coordinates: { Latitude: number; Longitude: number }[];
  };
}

interface SiteSubcontractorsFormValues {
  enterpriseIds: string[];
}

type SiteSubcontractorsSubmitData = SubmitData<SiteSubcontractorsFormValues>;

interface SiteSubcontractorsPostBody {
  zoneGroupId: string;
  enterpriseIds: string[];
}

interface SiteSubcontractorsStatusPutBody {
  zoneGroupId: string;
  enterpriseId: string;
  isActive: boolean;
}

interface Subcontractor {
  devicesCount: number;
  displayName: string;
  id: string;
  isActive: boolean;
  workersCount: number;
}

interface SubcontractorStatusDialogState {
  siteId: string;
  enterpriseId: string;
  active: boolean;
  name: string;
}

interface SigurDBDTO {
  id: number;
  address: string;
  password?: string;
  databaseMain: string;
  databaseLog: string;
  login: string;
  port: number;
}

type SigurDBSubmitData = SubmitData<SigurDBDTO>;
