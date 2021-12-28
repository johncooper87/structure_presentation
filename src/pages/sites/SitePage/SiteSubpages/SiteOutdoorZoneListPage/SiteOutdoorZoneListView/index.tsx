import { Grid, Box } from '@material-ui/core';
import MapContainer from 'components/_Map';
import { useLayout, useSelectedData } from 'hooks';
import { zoneToPolygon } from 'utils/zoneToPolygon';
import SiteOutdoorZoneListItem from './SiteOutdoorZoneListItem';

function SiteOutdoorZoneListView({ data }: { data: Zone[] }) {
  const layout = useLayout();

  const zones: Zone[] = useSelectedData();
  const selectedZone = zones[0];
  const map = useMemo(() => {
    if (layout === 'mobile') return null;
    const polygons: Polygon[] = selectedZone ? [zoneToPolygon(selectedZone)] : undefined;
    return (
      <MapContainer
        bounds={polygons?.flatMap(p => p.latlngs)}
        polygons={polygons}
        style={{ width: '100%', height: '500px' }}
      />
    );
  }, [layout, selectedZone]);

  return (
    <Box overflow="hidden" pl={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {data?.map(zone => (
            <SiteOutdoorZoneListItem key={zone.id} data={zone} />
          ))}
        </Grid>

        <Grid item xs={12} sm={6}>
          {map}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SiteOutdoorZoneListView;
