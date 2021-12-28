import { useFormState } from 'components/Form';
import { Form } from 'components';
import MapContainer, { BaseMapProps } from 'components/_Map';
import fetchSiteIndoorZoneImage from 'pages/sites/queries/fetchSiteIndoorZoneImage';
import { http } from 'utils';
import FloorSelect from './FloorSelect';
import SearchWorkerControl from './SearchWorkerControl';
import BeaconSwitcher from './BeaconSwitcher';
import styles from './styles.module.scss';

function IZMap({
  beacons,
  bounds,
  indoorPointMarkers,
  hideZonesWhenIndoor,
  polygons,
  circleMarkers,
  rootStyle,
  polylines,
  progressiveTrack = false,
  ...props
}: {
  beacons?: Beacon[];
  indoorPointMarkers?: IndoorPointMarker[];
  hideZonesWhenIndoor?: boolean;
  rootStyle?: React.CSSProperties;
} & BaseMapProps) {
  const { values } = useFormState<{ indoorZoneId: string }>();
  const { indoorZoneId } = values;

  const { data: indoorZone } = useQuery(
    ['INDOOR_ZONE_MAP/INDOOR_ZONE', indoorZoneId],
    async () => {
      return (await http.get('/api/indoor/mappictures/' + indoorZoneId)) as SiteIndoorZone;
    },
    { enabled: Boolean(indoorZoneId), staleTime: 1000 * 60 * 10, keepPreviousData: false }
  );

  const { data: zoneImage } = useQuery(
    ['INDOOR_ZONE_MAP/ZONE_IMAGE', indoorZone?.id],
    () => fetchSiteIndoorZoneImage(indoorZone.id),
    { enabled: Boolean(indoorZone), staleTime: 1000 * 60 * 10, keepPreviousData: false }
  );

  const corners = useMemo(() => {
    return indoorZoneId && indoorZone
      ? (indoorZone?.coordinates.map(({ latitude, longitude }) => [latitude, longitude]) as [
          LatLng,
          LatLng,
          LatLng,
          LatLng
        ])
      : undefined;
  }, [indoorZoneId, indoorZone]);

  const _circleMarkers = useMemo(() => {
    return indoorZoneId && beacons && beacons.length > 0
      ? beacons
          .filter(b => b.indoorZoneId === indoorZoneId)
          .map(
            b =>
              ({
                id: b.id,
                latlng: [b.latitude, b.longitude],
                radius: 4,
                pane: 'beacons',
              } as CircleMarker)
          )
      : undefined;
  }, [indoorZoneId, beacons]);

  const pointCircleMarkers = useMemo(() => {
    if (!indoorPointMarkers || !indoorZone || indoorPointMarkers.length === 0) return;
    return indoorPointMarkers
      .filter(b => b.floor === indoorZone.floor)
      .map(
        b =>
          ({
            id: b.workerId + ':' + b.dateTime,
            latlng: [b.latitude, b.longitude],
            radius: 6,
            color: b.sos ? 'red' : 'blue',
            tooltip: { date: b.dateTime, workerFullName: b.workerFullName },
          } as CircleMarker)
      );
  }, [indoorZone, indoorPointMarkers]);

  return (
    <MapContainer
      progressiveTrack={progressiveTrack}
      bounds={corners ?? bounds}
      circleMarkers={progressiveTrack ? undefined : pointCircleMarkers ?? _circleMarkers ?? circleMarkers}
      style={rootStyle ?? { width: '100%', height: '500px' }}
      distortableImage={indoorZoneId && indoorZone && zoneImage ? zoneImage : undefined}
      editableImage={false}
      corners={corners}
      polygons={hideZonesWhenIndoor && indoorZoneId ? undefined : polygons}
      polylines={indoorZoneId && indoorPointMarkers && indoorPointMarkers.length !== 0 ? undefined : polylines}
      {...props}
    />
  );
}

function IndoorZonesMap({
  siteId,
  beacons,
  selectFirst,
  rootStyle,
  indoorPointMarkers,
  hideZonesWhenIndoor,
  selectedFloor,
  onFloorChange,
  mainMapWidget = false,
  ...props
}: {
  siteId: string;
  beacons?: Beacon[];
  selectFirst?: boolean;
  indoorPointMarkers?: IndoorPointMarker[];
  rootStyle?: React.CSSProperties;
  hideZonesWhenIndoor?: boolean;
  selectedFloor?: number;
  onFloorChange?: (zoneId: string, floor: number) => void;
  mainMapWidget?: boolean;
} & BaseMapProps) {
  const [showBeacon, setShowBeacon] = useState<boolean>(true);
  const [selectedWorker, setSelectedWorker] = useState<Marker>();

  const onChangeShowBeacon = () => setShowBeacon(prev => !prev);

  useEffect(() => {
    setSelectedWorker(null);
  }, [siteId]);
  return (
    <div className={styles.indoorZonesMap} style={rootStyle ?? { width: '100%', height: '500px' }}>
      <Form initialValues={{ siteId }} enableReinitialize>
        {selectedFloor && <BeaconSwitcher showBeacon={showBeacon} onChange={onChangeShowBeacon} />}
        <IZMap
          hideZonesWhenIndoor={hideZonesWhenIndoor}
          indoorPointMarkers={indoorPointMarkers}
          beacons={showBeacon ? beacons : []}
          rootStyle={rootStyle}
          {...props}
          markers={props?.markers}
          selectedWorker={selectedWorker}
        />

        {mainMapWidget && props?.markers?.length &&
          <SearchWorkerControl
            workerList={props?.markers || []}
            selectedWorker={selectedWorker}
            setSelectedWorker={setSelectedWorker}
          />}
        <FloorSelect
          onChange={onFloorChange}
          key={siteId}
          selectFirst={selectFirst}
          variant="outlined"
        />
      </Form>
    </div>
  );
}

export default IndoorZonesMap;
