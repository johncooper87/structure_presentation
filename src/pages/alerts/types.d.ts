interface AlertDTO {
  alertId: string;
  dateAlert: string;
  isLooked: boolean;
  comment: string | null;
  location: LngLat;
  deviceType: string;
  serialNumber: string;
  workerId: string;
  workerFullName: string;
  zoneGroupName: string | null;
  enterpriseName: string;
  zones: Zone[];
  alertType: number;
  indoorZoneId: string;
}

type AlertListPageQueryParams = ListViewQueryParams &
  Partial<{
    status: 'unresponded' | 'responded';
    workerName: string;
    siteName: string;
    enterpiseName: string;
    // enterpriseId: IDQueryParam;
    // constructionSiteId: IDQueryParam;
    // orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;

interface AlertRespondeFormValues {
  comment?: string;
}

type AlertRespondeSubmitData = SubmitData<AlertRespondeFormValues>;

interface AlertRespondeSocketData {
  alertId: string;
  comment?: string;
}

interface AlertSocketData {
  isLooked: boolean;
  comment?: string;
}
