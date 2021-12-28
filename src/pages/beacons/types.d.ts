type BeaconListPageQueryParams = PageViewQueryParams &
  Partial<{
    siteId: string;
  }>;

interface BeaconFormValues {
  address: string;
  floor: number;
  id: string;
  indoorZoneId: string;
  latitude: string | number;
  longitude: string | number;
  major: number;
  minor: number;
  uuId: string;
  siteId: string;
}

type BeaconSubmitData = SubmitData<BeaconFormValues>;

interface BeaconPostBody {
  address: string;
  floor: number;
  id: string;
  indoorZoneId: string;
  latitude: number;
  longitude: number;
  major: number;
  minor: number;
  uuId: string;
}

type BeaconPutBody = BeaconPostBody;

interface Beacon {
  address: string;
  floor: number;
  id: string;
  indoorZoneId: string;
  latitude: number;
  longitude: number;
  major: number;
  minor: number;
  uuId: string;
}
