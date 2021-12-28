import { ListItem, ListItemText } from '@material-ui/core';
import { ExpandableListItem } from 'components';
import MapContainer from 'components/_Map';
import { useLayout, useSelected } from 'hooks';
import { http } from 'utils';
import fetchSiteIndoorZoneImage from 'pages/sites/queries/fetchSiteIndoorZoneImage';

interface MobileLayoutBeaconListItemProps {
  data: Beacon;
  expanded: boolean;
  onExpand: () => void;
}

function MobileLayoutBeaconListItem({ data, expanded, onExpand }: MobileLayoutBeaconListItemProps) {
  const { latitude, longitude, indoorZoneId, address, floor, uuId } = data;
  const { data: indoorZone } = useQuery(
    ['BEACONS/INDOOR_ZONE', indoorZoneId],
    async () => {
      return (await http.get('/api/indoor/mappictures/' + indoorZoneId)) as SiteIndoorZone;
    },
    { enabled: Boolean(indoorZoneId), keepPreviousData: false }
  );
  const { data: indoorZoneImage } = useQuery(['BEACONS/INDOOR_ZONE_IMAGE'], () =>
    fetchSiteIndoorZoneImage(indoorZoneId)
  );
  const map = useMemo(() => {
    const circleMarkers: CircleMarker[] = [
      {
        id: 'beacon',
        latlng: [Number(latitude), Number(longitude)],
        radius: 4,
      },
    ];
    const corners = indoorZone
      ? (indoorZone.coordinates.map(({ latitude, longitude }) => [latitude, longitude]) as [
          LatLng,
          LatLng,
          LatLng,
          LatLng
        ])
      : undefined;
    return (
      <MapContainer
        bounds={corners}
        style={{ width: '100%', height: '350px' }}
        circleMarkers={circleMarkers}
        corners={corners}
        distortableImage={indoorZoneImage}
        editableImage={false}
      />
    );
  }, [indoorZone, indoorZoneImage, latitude, longitude]);
  return (
    <ExpandableListItem {...{ expanded, onExpand }} collapse={map}>
      <ListItemText
        primary={
          <>
            <span style={{ fontWeight: 500 }}>MAC адрес:</span> {address},{' '}
          </>
        }
        secondary={
          <>
            <strong>UUID:</strong> {uuId}
          </>
        }
      />
      <ListItemText
        style={{ textAlign: 'end' }}
        secondary={
          <>
            <span style={{ fontWeight: 500 }}>{floor} этаж</span>
          </>
        }
      />
    </ExpandableListItem>
  );
}

interface BeaconListItemProps {
  data: Beacon;
  selectable?: boolean;
}

function BeaconListItem({ data, selectable = true }: BeaconListItemProps) {
  const { uuId, address, floor } = data;
  const [selected, toggleSelected] = useSelected(data.id, data);

  const layout = useLayout();
  if (layout === 'mobile' && selectable)
    return <MobileLayoutBeaconListItem expanded={selected} onExpand={toggleSelected} data={data} />;

  return (
    <ListItem
      button={selectable as true}
      selected={selectable ? selected : undefined}
      onClick={selectable ? toggleSelected : undefined}
      style={{ justifyContent: 'space-between' }}
    >
      <ListItemText
        primary={
          <>
            <span style={{ fontWeight: 500 }}>MAC адрес:</span> {address},{' '}
          </>
        }
        secondary={
          <>
            <strong>UUID:</strong> {uuId}
          </>
        }
      />
      <ListItemText
        style={{ textAlign: 'end' }}
        secondary={
          <>
            <span style={{ fontWeight: 500 }}>{floor} этаж</span>
          </>
        }
      />
    </ListItem>
  );
}

export default BeaconListItem;
