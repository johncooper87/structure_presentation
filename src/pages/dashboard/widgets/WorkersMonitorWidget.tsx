import {
  Box, Button, Drawer, DrawerProps, Fab, Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs, Tooltip, Typography,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import { DatePicker, Form, getColor, Select, SelectItem, Switch, TimePicker } from 'components';
import IndoorZonesMap from 'components/IndoorZonesMap';
import { workerSuccessIcon } from 'components/MapElements/WorkerMarker';
import { useLayout } from 'hooks';
import Leaflet from 'leaflet';
import fetchPageBeaconList from 'pages/beacons/queries/fetchPageBeaconList';
import PositionSelect from 'pages/workers/PositionSelect';
import { WorkerSelect } from 'templates';
import { http, notify } from 'utils';
import styles from './styles.module.scss';

// import mockData from './WorkersMonitorMockData.json';
// import { compareAsc } from 'date-fns';

interface FilterValues {
  searchType: 'worker' | 'position';
  searchEntityId: string | null;
  date: string;
  startTime: string;
  endTime: string;
  onlyValid: boolean;
  progressiveTrack: boolean;
}

const getDefaultFilterValues = () =>
  ({
    searchType: 'worker',
    searchEntityId: null,
    date: new Date().toISOString().slice(0, 10),
    startTime: '08:00',
    endTime: '17:00',
    onlyValid: true,
  } as FilterValues);

interface IndoorPoint {
  dateTime: string;
  floor: number;
  latitude: number;
  log: number;
  longitude: number;
  sos: boolean;
}

type WorkersMonitorData = {
  workerFullName: string;
  workerId: string;
  serialNumber: string;
  points: { date: string; location: LatLng }[];
  zones: Zone[];
  entries: {
    zoneId: string;
    zoneName: string;
    zoneEntryTime: string;
  }[];
  indoorPoints: IndoorPoint[];
}[];

async function fetchWorkersMonitorData(
  siteId: string,
  { searchType, searchEntityId, date, startTime, endTime, onlyValid }: FilterValues
) {
  const response = await http.get('/api/kbi/dashboards/trackinginproject', {
    zoneGroupId: siteId,
    begin: date + 'T' + startTime,
    end: date + 'T' + endTime,
    includeInValid: !onlyValid,
    workerId: searchType === 'worker' ? searchEntityId : undefined,
    professionId: searchType === 'position' ? searchEntityId : undefined,
    fields: '*,zones[id,name,color,states[points]]',
  });
  if (!response) return [];

  // fragment for debugging
  // return mockData[searchType === 'worker' ? 'byWorker' : 'byPosition'] as WorkersMonitorData;

  return response.result as WorkersMonitorData;
}

async function fetchSiteZones(siteId: string) {
  const fields = 'zoneGroup[id,name,zones[id,name,color,deleted,states[deleted,points]]]';
  const { result } = await http.get(
    `/api/kbi/construction-site/${siteId}`,
    { fields },
    { onError: () => notify.error('Не удалось получить зоны объекта') }
  );
  if (!result) return [];
  return [result?.zoneGroup];
}

function getWorkersMonitorMapData(data: WorkersMonitorData, floor?: number, progressiveTrack?: boolean) {
  if (data?.length === 0) return {};

  const polylines = data
    .filter(item => item.points?.length > 0)
    .map(({ points }, index) => {
      const sumDistance = points.reduce((distance, { location: [lng, lat] }, index) => {
        if (index === 0) return 0;
        const prevLatLng = points[index - 1].location;
        const d = (Math.abs(lng - prevLatLng[0]) ** 2 + Math.abs(lat - prevLatLng[1]) ** 2) ** 0.5;
        return distance + d;
      }, 0);

      const getLatLngs = () => {
        let currDistance = 0;
        const arr = points.map(
          ({ location: [lng, lat] }, pointIndex) => {
            let d = 0;
            if (pointIndex > 0) {
              d = (
                Math.abs(lng - points[pointIndex - 1].location[0]) ** 2 +
                Math.abs(lat - points[pointIndex - 1].location[1]) ** 2
              ) ** 0.5;
              currDistance += d;
            }
            return ([
              lat,
              lng,
              currDistance / sumDistance,
            ]);
          });
          return arr;
      };

      return ({
        id: new Date().toISOString(),
        latlngs: progressiveTrack ? getLatLngs() : points.map(({ location: [lng, lat] }) => [lat, lng] as LatLng),
        color: getColor(index + 6) + '55',
        decoratorPatterns: progressiveTrack ? null : [
          {
            offset: 10,
            repeat: 50,
            symbol: Leaflet.Symbol.arrowHead({
              pixelSize: 5,
              pathOptions: {
                fill: true,
                opacity: 0.9,
                fillOpacity: 0.7,
                color: getColor(index + 6),
                weight: 1,
              },
            }),
          },
        ],
      });
    });

  const circleMarkers: CircleMarker[] = data
    .filter(item => item.points?.length > 0)
    .map(({ workerId, workerFullName, points }, index) => {
      return points.slice(0, points.length - 1).map(({ location: [lng, lat], date }) => ({
        id: workerId + ':' + date,
        latlng: [lat, lng] as LatLng,
        color: getColor(index + 6) + '99',
        radius: 5,
        tooltip: {
          workerFullName,
          date,
        },
      }));
    })
    .flat();

  const markers: Marker[] = data
    .filter(item => item.points?.length > 0)
    .map(({ workerId, workerFullName, points, indoorPoints }, index) => {

      if (floor) {
        const floorPoints = (indoorPoints ?? []).filter(p => p.floor === floor);
        if (floorPoints.length === 0) return null;
        const {
          latitude,
          longitude,
          dateTime,
        } = floorPoints[floorPoints.length - 1];
        return {
          id: workerId,
          latlng: [latitude, longitude] as LatLng,
          icon: workerSuccessIcon,
          tooltip: {
            workerFullName,
            date: dateTime,
          },
        };
      }

      const {
        location: [lng, lat],
        date,
      } = points[points.length - 1];
      return {
        id: workerId,
        latlng: [lat, lng] as LatLng,
        icon: workerSuccessIcon,
        tooltip: {
          workerFullName,
          date,
        },
      };
    }).filter(Boolean);

  const polygons: Polygon[] = data
    .flatMap(item => item.zones)
    .reduce((total, zone) => {
      if (total.some(_zone => _zone.id === zone.id)) return total;
      return [...total, zone];
    }, [])
    .map(({ name, states, color: [red, green, blue, alpha] }) => ({
      id: name,
      latlngs: states[0].points.map(([lat, lng]) => [lng, lat]),
      color: `rgba(${red},${green},${blue},${alpha})`,
      tooltip: name,
    }));

  const indoorPointMarkers = data
    ?.filter(w => w.indoorPoints)
    .flatMap(w =>
      w.indoorPoints?.map(
        ip =>
          ({
            ...ip,
            workerId: w.workerId,
            workerFullName: w.workerFullName,
          } as IndoorPointMarker)
      )
    );

  const bounds =
    polylines?.length > 0
      ? polylines.flatMap(pl => pl.latlngs)
      : polygons?.length
      ? polygons.flatMap(pl => pl.latlngs)
      : undefined;

  return {
    progressiveTrack,
    polylines,
    bounds,
    circleMarkers,
    markers,
    polygons,
    indoorPointMarkers: indoorPointMarkers?.length > 0 ? indoorPointMarkers : undefined,
  };
}

const validateEntityId = (value: string) => (value ? undefined : 'Необходимо выбрать значение');

const renderTooltip: TooltipRenderFn = (entityName, data) => {
  let content = null;

  if (entityName === 'Polygon') {
    content = <Typography className={styles.polygonTooltip}>{data}</Typography>;
  }

  if (entityName === 'Marker' || entityName === 'CircleMarker') {
    const { workerFullName, date } = data as { workerFullName: string; date: string };
    content = (
      <>
        <Typography>{workerFullName}</Typography>
        <Typography>{new Date(date).toLocaleString('ru')}</Typography>
      </>
    );
  }

  return (
    <Paper className={styles.mapWidgetTooltip} elevation={4}>
      <Box padding={1}>{content}</Box>
    </Paper>
  );
};

function WorkersMonitorWidget({ siteId }: { siteId?: string }) {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue) => setTab(newValue),
    []
  );

  const [filterValues, setFilterValues] = useState<FilterValues>({
    searchType: 'worker',
  } as FilterValues);
  const { searchEntityId, searchType, progressiveTrack } = filterValues;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setFilterValues(getDefaultFilterValues), [siteId]);

  const { data = [] } = useQuery(
    ['WIDGETS/WORKERS_MONITOR', siteId, filterValues],
    () => fetchWorkersMonitorData(siteId, filterValues),
    { enabled: Boolean(searchEntityId) }
  );

  const { data: outdoorZones = [] } = useQuery(
    ['WIDGETS/WORKERS_MONITOR/POLYGONS', siteId],
    () => fetchSiteZones(siteId),
    { enabled: !searchEntityId }
  );
  // const filteredData = useMemo(() => filterDataByPositionId(data, positionId), [data, positionId]);

  const [floor, setFloor] = useState(null);
  const mapData = useMemo(
    () => getWorkersMonitorMapData(searchEntityId ? data : outdoorZones, floor, progressiveTrack),
    [data, outdoorZones, searchEntityId, floor, progressiveTrack]
  );

  const [entriesStartTime, setEntriesStartTime] = React.useState('00:00');
  const displayedEntries = useMemo(() => {
    const specifiedDate = new Date('01.01.01 ' + entriesStartTime);
    return data?.[0]?.entries.filter(({ zoneEntryTime }) => {
      const currentDate = new Date('01.01.01 ' + zoneEntryTime);
      return currentDate > specifiedDate;
    });
  }, [data, entriesStartTime]);

  const { data: beacons = [] } = useQuery(['BEACONS/BEACON_LIST', siteId], () =>
    fetchPageBeaconList({ siteId })
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const layout = useLayout();
  const isMobile = layout === 'mobile';
  const displayFilter = isMobile ? filterOpen : true;
  const FilterContainer = isMobile ? Drawer : Box;
  const openFilter = () => setFilterOpen(true);
  const closeFilter = () => setFilterOpen(false);
  const FilterContainerProps = isMobile ? {
    open: displayFilter,
    onClose: closeFilter,
    classes: { paper: styles.workerMonitorDrawerPaper },
  } as DrawerProps : {};

  return (
    <Box display="flex" height="100%">

      <FilterContainer width="450px" {...FilterContainerProps}>

        <span>
          <Box pb="24px">
            <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Основное" />
              <Tab label="Дополнительно" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Form initialValues={filterValues} onChange={setFilterValues}>
              <Box className={styles.controlsVertical}>
                <Select name="searchType" label="Тип поиска" variant="standard">
                  <SelectItem value="worker" label="По сотруднику" />
                  <SelectItem value="position" label="По должности" />
                </Select>
                {searchType === 'worker' && (
                  <WorkerSelect
                    siteId={siteId}
                    name="searchEntityId"
                    validate={validateEntityId}
                    variant="standard"
                  />
                )}
                {searchType === 'position' && (
                  <PositionSelect
                    name="searchEntityId"
                    validate={validateEntityId}
                    variant="standard"
                  />
                )}
                <DatePicker
                  fullWidth
                  disableKeyboardInput
                  inputVariant="standard"
                  name="date"
                  label="Дата"
                />
                <Box display="flex" justifyContent="space-between">
                  <TimePicker inputVariant="standard" name="startTime" label="Начальное время" />
                  <TimePicker inputVariant="standard" name="endTime" label="Конечное время" />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Только валидные</Typography>
                  <Switch name="onlyValid" />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Цветной трек</Typography>
                  <Switch name="progressiveTrack" />
                </Box>
              </Box>
            </Form>
          )}

          {tab === 1 && (
            <Form
              initialValues={{ entriesStartTime }}
              onChange={({ entriesStartTime }) => setEntriesStartTime(entriesStartTime || '00:00')}
            >
              <Box className={styles.controlsVertical}>
                <Typography>Минимальное время нахождения в зоне</Typography>
                <TimePicker
                  disabled={searchType !== 'worker' || data?.length === 0}
                  inputVariant="standard"
                  name="entriesStartTime"
                />
              </Box>
              <Box pt="24px">
                {searchType === 'worker' && displayedEntries?.length > 0 && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Зона</TableCell>
                        <TableCell>Время нахождения</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedEntries.map(({ zoneName, zoneEntryTime }) => (
                        <TableRow key={zoneName}>
                          <TableCell>{zoneName}</TableCell>
                          <TableCell>{zoneEntryTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </Form>
          )}
        </span>

        {isMobile && <Button onClick={closeFilter}>Скрыть</Button>}

      </FilterContainer>

      <Box width="100%" ml="16px">
        <IndoorZonesMap
          beacons={beacons}
          siteId={siteId}
          rootStyle={{ width: '100%', height: '100%' }}
          style={{ width: '100%', height: '100%' }}
          renderTooltip={renderTooltip}
          {...mapData}
          hideZonesWhenIndoor
          editableImageZIndex={100}
          onFloorChange={(_zoneId, _floor) => setFloor(_floor)}
        />
      </Box>

      {isMobile && (
        <div className={styles.workerMonitorFabContainer}>
          <Tooltip title="Показать фильтр">
            <Fab size="small" onClick={openFilter}>
              <FilterIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
    </Box>
  );
}

export default React.memo(WorkersMonitorWidget);
