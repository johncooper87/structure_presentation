import { Grid, Box } from '@material-ui/core';
import MapContainer from 'components/_Map';
import { useLayout, useSelectedData } from 'hooks';
import { zoneListToPolygonList } from 'utils/zoneToPolygon';
import SiteIndoorZoneListItem from './SiteIndoorZoneListItem';
import fetchSiteIndoorZoneImage from '../../../../queries/fetchSiteIndoorZoneImage';

function SiteIndoorZoneListView({ data, allZones }: { data: SiteIndoorZone[]; allZones: Zone[] }) {
  const layout = useLayout();

  const indoorZones: SiteIndoorZone[] = useSelectedData();
  const selectedZone = indoorZones[0];

  const { data: indoorZoneImage } = useQuery(
    ['SITES/INDOOR_ZONE_IMAGE', selectedZone],
    () => fetchSiteIndoorZoneImage(selectedZone.id),
    { enabled: Boolean(selectedZone) }
  );

  const polygons = useMemo(() => zoneListToPolygonList(allZones ?? []), [allZones]);

  const map = useMemo(() => {
    if (layout === 'mobile') return null;
    const corners = selectedZone?.coordinates?.map(({ latitude, longitude }) => [
      latitude,
      longitude,
    ]) as [LatLng, LatLng, LatLng, LatLng];
    return (
      <MapContainer
        bounds={corners ?? polygons?.flatMap(p => p.latlngs)}
        polygons={polygons}
        style={{ width: '100%', height: '500px' }}
        distortableImage={selectedZone ? indoorZoneImage : undefined}
        // onDistortImage={setCorners}
        editableImage={false}
        corners={corners}
      />
    );
  }, [layout, polygons, indoorZoneImage, selectedZone]);

  return (
    <Box overflow="hidden" pl={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {data?.map(zone => (
            <SiteIndoorZoneListItem key={zone.id} data={zone} polygons={polygons} />
          ))}
        </Grid>

        <Grid item xs={12} sm={6}>
          {map}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SiteIndoorZoneListView;
