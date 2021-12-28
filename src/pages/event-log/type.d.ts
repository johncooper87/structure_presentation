interface HistoryDTO {
  lastWorkerId: string;
  lastWorkerName: string;
  shift: {
    begin: string;
    end: string;
  };
  mobject: {
    powerOn: boolean;
    serialNumber: string;
    deveceType: 'Часы' | 'Карта';
    lastPointTime: string;
    lastPackageTime: string;
    latitude: number;
    longitude: number;
    isValid: boolean;
    accuracy: number;
    lastSOSDateTime: string;
    wifiLink: boolean;
    timeFromLastPointTime: number;
    batteryCharge: number;
    isPutOn: boolean;
  };
}

interface HistoryRequestParams {
  start: string;
  end: string;
  workerId?: IDQueryParam;
  constructionSiteId?: IDQueryParam;
}

type HistoryListPageQueryParams = ListViewQueryParams &
  HistoryRequestParams &
  Partial<{
    enterpriseId: IDQueryParam;
    // orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;

type RecentDataDTO = HistoryDTO;

interface RecentDataRequestParams {
  enterpriseId?: IDQueryParam;
  workerId?: IDQueryParam;
  constructionSiteId?: IDQueryParam;
}

type RecentDataListPageQueryParams = ListViewQueryParams &
  RecentDataRequestParams &
  Partial<{
    enterpriseId: IDQueryParam;
    // orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;
