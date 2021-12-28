type DeviceListPageQueryParams = ListViewQueryParams &
  Partial<{
    status: 'archive' | 'any';
    type: 'watch' | 'card';
    attached: boolean;
    serialNumber: string;
    workerName: string;
    enterpriseId: IDQueryParam;
    constructionSiteId: IDQueryParam;
    orderBy: 'serialNumber' | 'worker' | 'enterprise';
  }>;

interface DeviceFormValues {
  type: DeviceType;
  archive: boolean;
  serialNumber: string;
  workerId?: string;
}

type DeviceSubmitData = SubmitData<DeviceFormValues>;

interface DevicePostBody {
  gpsAddr: string;
  worker?: string;
  attributes?: {
    status: DeviceStatus;
  };
}

type DevicePutBody = DevicePostBody;
