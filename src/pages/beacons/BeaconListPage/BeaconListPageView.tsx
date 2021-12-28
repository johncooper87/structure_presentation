import { Grid } from '@material-ui/core';
import { CircularProgress, List, Overlay, QueryPaginator, TopbarProgress } from 'components';
import IndoorZonesMap from 'components/IndoorZonesMap';
import MapContainer from 'components/_Map';
import { useLayout, useQueryParams, useSelectedData } from 'hooks';
import { http } from 'utils';
import fetchSiteIndoorZoneImage from '../../sites/queries/fetchSiteIndoorZoneImage';
import fetchPageBeaconList from '../queries/fetchPageBeaconList';
import BeaconListItem from './BeaconListItem';

const BeaconListPageView = () => {
  const queryParams = useQueryParams();
  const {
    data: allBeacons = [],
    isFetching,
    isLoading,
  } = useQuery(['BEACONS/BEACON_LIST', queryParams], () => fetchPageBeaconList(queryParams));

  const { page = 0, siteId } = useQueryParams() as BeaconListPageQueryParams;

  const beacons = useMemo(() => allBeacons.slice(page * 10, (page + 1) * 10), [allBeacons, page]);

  const layout = useLayout();

  const selectedData: Beacon[] = useSelectedData();
  const selectedBeacon = selectedData[0];

  const { data: indoorZone } = useQuery(
    ['BEACONS/INDOOR_ZONE', selectedBeacon?.indoorZoneId],
    async () => {
      return (await http.get(
        '/api/indoor/mappictures/' + selectedBeacon.indoorZoneId
      )) as SiteIndoorZone;
    },
    { enabled: Boolean(selectedBeacon) }
  );

  const { data: zoneImage } = useQuery(
    ['BEACONS/ZONE_IMAGE', indoorZone?.id],
    () => fetchSiteIndoorZoneImage(indoorZone.id),
    { enabled: Boolean(indoorZone), staleTime: 1000 * 60 * 10 }
  );

  const map = useMemo(() => {
    if (layout === 'mobile') return null;
    if (!selectedBeacon)
      return (
        <IndoorZonesMap
          beacons={allBeacons}
          siteId={siteId}
          selectFirst
          editableImageZIndex={100}
          rootStyle={{ width: '100%', height: 'calc(100vh - 200px)' }}
        />
      );
    const circleMarkers: CircleMarker[] = selectedBeacon
      ? [
          {
            id: 'beacon',
            latlng: [selectedBeacon.latitude, selectedBeacon.longitude],
            radius: 4,
          },
        ]
      : undefined;
    return (
      <MapContainer
        bounds={circleMarkers?.map(cm => cm.latlng)}
        circleMarkers={circleMarkers}
        style={{ width: '100%', height: '500px' }}
        distortableImage={selectedBeacon && indoorZone && zoneImage ? zoneImage : undefined}
        editableImage={false}
        corners={
          selectedBeacon && indoorZone
            ? (indoorZone?.coordinates.map(({ latitude, longitude }) => [latitude, longitude]) as [
                LatLng,
                LatLng,
                LatLng,
                LatLng
              ])
            : undefined
        }
        editableImageZIndex={100}
      />
    );
  }, [layout, selectedBeacon, indoorZone, zoneImage, allBeacons, siteId]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Overlay display={isFetching}>
            <CircularProgress display={isLoading} />
            <TopbarProgress display={!isLoading && isFetching} />
            <List>
              {beacons?.map(beacon => (
                <BeaconListItem key={beacon.id} data={beacon} />
              ))}
            </List>
          </Overlay>
        </Grid>

        <Grid item xs={12} sm={6}>
          {map}
        </Grid>
      </Grid>

      <QueryPaginator total={allBeacons?.length} />
    </>
  );
};

export default BeaconListPageView;
