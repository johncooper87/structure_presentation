import { ListItem, ListItemText } from '@material-ui/core';
import { ExpandableListItem } from 'components';
import { useLayout, useSelected } from 'hooks';
import MapContainer from 'components/_Map';
import fetchSiteIndoorZoneImage from '../../../../queries/fetchSiteIndoorZoneImage';

interface MobileLayoutSiteIndoorZoneListItemProps {
  data: SiteIndoorZone;
  expanded: boolean;
  onExpand: () => void;
  polygons: Polygon[];
}

function MobileLayoutSiteIndoorZoneListItem({
  data,
  expanded,
  onExpand,
  polygons,
}: MobileLayoutSiteIndoorZoneListItemProps) {
  const { floor, id, coordinates } = data;
  const { data: indoorZoneImage } = useQuery(['SITES/INDOOR_ZONE_IMAGE'], () =>
    fetchSiteIndoorZoneImage(id)
  );
  const map = useMemo(() => {
    const corners = coordinates.map(({ latitude, longitude }) => [latitude, longitude]) as [
      LatLng,
      LatLng,
      LatLng,
      LatLng
    ];
    return (
      <MapContainer
        bounds={corners ?? polygons?.flatMap(p => p.latlngs)}
        polygons={polygons}
        style={{ width: '100%', height: '350px' }}
        corners={corners}
        distortableImage={indoorZoneImage}
        editableImage={false}
      />
    );
  }, [polygons, coordinates, indoorZoneImage]);
  return (
    <ExpandableListItem {...{ expanded, onExpand }} collapse={map}>
      <ListItemText primary={'Этаж ' + floor} />
    </ExpandableListItem>
  );
}

interface SiteIndoorZoneListItemProps {
  data: SiteIndoorZone;
  polygons: Polygon[];
}

function SiteIndoorZoneListItem({ data, polygons }: SiteIndoorZoneListItemProps) {
  const layout = useLayout();
  const [selected, toggleSelected] = useSelected(data.id, data);

  if (layout === 'mobile')
    return (
      <MobileLayoutSiteIndoorZoneListItem
        expanded={selected}
        onExpand={toggleSelected}
        data={data}
        polygons={polygons}
      />
    );

  const { floor } = data;
  return (
    <ListItem button selected={selected} onClick={toggleSelected}>
      <ListItemText primary={'Этаж ' + floor} />
    </ListItem>
  );
}

export default SiteIndoorZoneListItem;
