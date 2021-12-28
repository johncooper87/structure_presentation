import {
  Avatar,
  IconButton, List,
  ListItem,
  ListItemAvatar,
  ListItemText, Paper, Tooltip,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { history } from 'app';
import ReadMoreIcon from 'components/icons/ReadMore';
import IndoorZonesMap from 'components/IndoorZonesMap';
import { MapWorkerIcon } from 'components/MapElements/WorkerMarker';
import fetchPageBeaconList from 'pages/beacons/queries/fetchPageBeaconList';
import { http } from 'utils';
import styles from './styles.module.scss';

// import mockData from './MapWidgetMockData.json';

interface WorkerState {
  datePoint: string;
  fullName: string;
  isBiomentry: boolean;
  isChecked: boolean;
  isValid: boolean;
  lag: number;
  location: LatLng;
  serialNumber: string;
  sos: boolean;
  workerId: string;
}

interface MapWidgetData {
  workerStates: WorkerState[];
  zones: {
    color: [red: number, green: number, blue: number, alpha: number];
    name: string;
    states: ZoneState;
  }[];
}

type IndoorMapWidgetData = {
  coordinates: {
    dateTime: string;
    floor: number;
    latitude: number;
    log: number;
    longitude: number;
    sos: boolean;
  }[];
  deviceId: string;
  workerId: string;
  workerName: string;
}[];

function getWorkerStateKey({ isChecked, sos, isValid, lag }: WorkerState) {
  if (sos) return 'Alert';
  if (!isValid) return 'Invalid';
  if (lag < 30) return isChecked ? 'RecentChecked' : 'RecentUnchecked';
  if (lag < 60) return 'Lagging';
  if (lag > 60) return 'VeryLagging';
}

const workerStateIcons = {
  Alert: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateAlert,
  }),
  Invalid: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateInvalid,
  }),
  RecentChecked: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateRecentChecked,
  }),
  RecentUnchecked: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateRecentUnchecked,
  }),
  Lagging: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateLagging,
  }),
  VeryLagging: new MapWorkerIcon({
    className: styles.workerStateMarker + ' ' + styles.workerStateVeryLagging,
  }),
};

function WorkerStateListItem({ data }: { data: WorkerState }) {
  const { fullName, datePoint, workerId } = data;
  const workerStateKey = getWorkerStateKey(data);
  return (
    <ListItem>
      <ListItemAvatar
        className={styles.workerStateAvatar + ' ' + styles['workerState' + workerStateKey]}
      >
        <Avatar>
          <PersonIcon fontSize="small" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={fullName}
        secondary={new Date(datePoint).toLocaleString('ru')}
      />
      <div className={styles.secondaryAction}>
        <Tooltip title="Перейти к сотруднику">
          <IconButton onClick={() => history.push('/workers/' + workerId)}>
            <ReadMoreIcon />
          </IconButton>
        </Tooltip>
      </div>
    </ListItem>
  );
}

const renderTooltip: TooltipRenderFn = (entityName, data) => {
  let content = null;

  if (entityName === 'Polygon') {
    content = <div className={styles.polygonTooltip}>{data}</div>;
  }

  if (entityName === 'Marker') {
    content = (
      <List dense disablePadding>
        <WorkerStateListItem data={data} />
      </List>
    );
  }

  if (entityName === 'MarkerCluster') {
    content = (
      <List dense disablePadding>
        {(data as WorkerState[]).map(workerState => (
          <WorkerStateListItem key={workerState.workerId} data={workerState} />
        ))}
      </List>
    );
  }

  return (
    <Paper className={styles.mapWidgetTooltip} elevation={4}>
      {content}
    </Paper>
  );
};

async function fetchMapWidgetData(siteId: string, selectedFloor: number) {
  if (selectedFloor) {
    const data: IndoorMapWidgetData = await http.get(
      '/api/indoor/indoornavigations/getnowbyfloor',
      {
        constructionSiteId: siteId,
        floor: selectedFloor,
      }
    );

    const workerStates =
      data?.map(({ workerId, workerName, deviceId, coordinates }) => {
        const { dateTime, latitude, longitude, log, sos } = coordinates?.[0] ?? {};
        return {
          datePoint: dateTime,
          fullName: workerName,
          lag: log,
          location: [longitude, latitude],
          serialNumber: deviceId,
          sos,
          workerId,
          isBiomentry: true,
          isChecked: true,
          isValid: true,
        } as Partial<WorkerState>;
      }) ?? [];

    return { workerStates, zones: [] } as MapWidgetData;
  }
  const { result } = await http.get('/api/kbi/dashboards/monitoringonmap', {
    zoneGroupId: siteId,
    fields: 'workerStates[*],zones[name,color,states[points]]',
  });

  // fragment for debugging
  // // @ts-expect-error
  // return mockData as MapWidgetData;

  return result as MapWidgetData;
}

function MapWidget({ siteId }: { siteId?: string }) {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const handleFloorChange = useCallback((zoneId, floor) => setSelectedFloor(floor), []);
  const current = useRef<{ selectedFloor: null }>(Object()).current;
  current.selectedFloor = selectedFloor;
  useMemo(() => {
    setSelectedFloor(null);
    current.selectedFloor = null;
  }, [siteId]);

  const { data = {} as MapWidgetData, isFetched } = useQuery(
    ['WIDGETS/MAP', siteId, current.selectedFloor],
    () => fetchMapWidgetData(siteId, current.selectedFloor),
    {
      enabled: Boolean(siteId),
      refetchInterval: 10000,
    }
  );

  const { markers, polygons } = useMemo(() => {
    const { workerStates = [], zones = [] } = data;

    const markers: Marker[] = workerStates
      .filter(item => item.isBiomentry)
      .map(workerState => {
        const {
          workerId,
          location: [lat, lng],
        } = workerState;
        const workerStateKey = getWorkerStateKey(workerState);
        return {
          id: workerId,
          latlng: [lng, lat],
          icon: workerStateIcons[workerStateKey],
          tooltip: workerState,
          sos: workerState.sos,
        };
      });
  
    const polygons: Polygon[] = zones.map(({ name, states, color: [red, green, blue, alpha] }) => ({
      id: name,
      latlngs: states.points.map(([lat, lng]) => [lng, lat]),
      color: `rgba(${red},${green},${blue},${alpha})`,
      tooltip: name,
    }));

    return { markers, polygons };
  }, [data]);

  const bounds = useMemo(() => {
    if (isFetched) return [...markers?.map(m => m.latlng), ...polygons?.flatMap(m => m.latlngs)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, isFetched]);

  const { data: beacons = [] } = useQuery(['BEACONS/BEACON_LIST', siteId], () =>
    fetchPageBeaconList({ siteId })
  );

  return (
    <IndoorZonesMap
      mainMapWidget
      beacons={beacons}
      siteId={siteId}
      markerCluster
      markers={markers}
      polygons={polygons}
      bounds={bounds?.length === 0 ? undefined : bounds}
      rootStyle={{ width: '100%', height: '100%' }}
      style={{ width: '100%', height: '100%' }}
      renderTooltip={renderTooltip}
      editableImageZIndex={300}
      selectedFloor={selectedFloor}
      onFloorChange={handleFloorChange}
    />
  );
}

export default MapWidget;
