import { ListItem, ListItemText } from '@material-ui/core';
import { zoneToPolygon } from 'utils/zoneToPolygon';
import { ExpandableListItem } from 'components';
import { useLayout, useSelected } from 'hooks';
import MapContainer from 'components/_Map';

interface MobileLayoutSiteOutdoorZoneListItemProps {
  data: Zone;
  expanded: boolean;
  onExpand: () => void;
}

function MobileLayoutSiteOutdoorZoneListItem({
  data,
  expanded,
  onExpand,
}: MobileLayoutSiteOutdoorZoneListItemProps) {
  const { name } = data;
  const map = useMemo(() => {
    const polygons: Polygon[] = [zoneToPolygon(data)];
    return (
      <MapContainer
        bounds="polygons"
        polygons={polygons}
        style={{ width: '100%', height: '350px' }}
      />
    );
  }, [data]);
  return (
    <ExpandableListItem {...{ expanded, onExpand }} collapse={map}>
      <ListItemText primary={name} />
    </ExpandableListItem>
  );
}

interface SiteOutdoorZoneListItemProps {
  data: Zone;
}

function SiteOutdoorZoneListItem({ data }: SiteOutdoorZoneListItemProps) {
  const layout = useLayout();
  const [selected, toggleSelected] = useSelected(data.id, data);

  if (layout === 'mobile')
    return (
      <MobileLayoutSiteOutdoorZoneListItem
        expanded={selected}
        onExpand={toggleSelected}
        data={data}
      />
    );

  const { name } = data;
  return (
    <ListItem button selected={selected} onClick={toggleSelected}>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default SiteOutdoorZoneListItem;
