import Leaflet from 'leaflet';
import { useFormState, useForm, useFormProps } from 'components/Form';
import { Grid, Box } from '@material-ui/core';
import { TextField } from 'components';
import MapContainer from 'components/_Map';
import fetchSiteIndoorZoneImage from 'pages/sites/queries/fetchSiteIndoorZoneImage';
import { http } from 'utils';
import FloorSelect from '../../FloorSelect';
import IndoorSiteSelect from '../../IndoorSiteSelect';

const UUIDMask = [
  ...new Array(8).fill(/\w/, 0, 8),
  '-',
  ...new Array(4).fill(/\w/, 0, 4),
  '-',
  ...new Array(4).fill(/\w/, 0, 4),
  '-',
  ...new Array(4).fill(/\w/, 0, 4),
  '-',
  ...new Array(12).fill(/\w/, 0, 12),
];

const MACAddressMask = [
  ...new Array(2).fill(/\w/, 0, 2),
  ':',
  ...new Array(2).fill(/\w/, 0, 2),
  ':',
  ...new Array(2).fill(/\w/, 0, 2),
  ':',
  ...new Array(2).fill(/\w/, 0, 2),
  ':',
  ...new Array(2).fill(/\w/, 0, 2),
  ':',
  ...new Array(2).fill(/\w/, 0, 2),
];

const LatLngMask = (value: string) => {
  if (value[0] === '-') return [/-/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  return [/[-\d]/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
};

function BeaconMapPosition() {
  const { readOnly } = useFormProps();
  const form = useForm();
  const { values } = useFormState<BeaconFormValues>();
  const { latitude, longitude, indoorZoneId } = values;

  const { data: indoorZone } = useQuery(
    ['BEACONS/INDOOR_ZONE', indoorZoneId],
    async () => {
      return (await http.get('/api/indoor/mappictures/' + indoorZoneId)) as SiteIndoorZone;
    },
    { enabled: Boolean(indoorZoneId), keepPreviousData: false }
  );

  const { data: zoneImage } = useQuery(
    ['BEACONS/ZONE_IMAGE', indoorZoneId],
    () => fetchSiteIndoorZoneImage(indoorZoneId),
    { enabled: Boolean(indoorZoneId), staleTime: 1000 * 60 * 10 }
  );

  const circleMarkers: CircleMarker[] = useMemo(() => {
    if (!latitude || !longitude || isNaN(Number(latitude)) || isNaN(Number(longitude))) return;
    return [
      {
        id: 'beacon',
        latlng: [Number(latitude), Number(longitude)],
        radius: 4,
      },
    ];
  }, [latitude, longitude]);

  const corners = useMemo(() => {
    return indoorZone
      ? (indoorZone?.coordinates.map(({ latitude, longitude }) => [latitude, longitude]) as [
          LatLng,
          LatLng,
          LatLng,
          LatLng
        ])
      : undefined;
  }, [indoorZone]);

  const handleMapClick = useCallback((event: Leaflet.LeafletMouseEvent) => {
    const { latlng } = event;
    form.change('latitude', latlng.lat.toString());
    form.change('longitude', latlng.lng.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapContainer
      bounds={corners}
      circleMarkers={circleMarkers}
      style={{ width: '100%', height: '500px', cursor: readOnly ? undefined : 'pointer' }}
      distortableImage={indoorZone && zoneImage ? zoneImage : undefined}
      editableImage={false}
      corners={corners}
      editableImageZIndex={100}
      onClick={readOnly ? undefined : handleMapClick}
    />
  );
}

const BeaconPageView = () => {
  return (
    <Box overflow="hidden" pl={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" spacing={2} wrap="nowrap">
              <Grid item xs={9}>
                <IndoorSiteSelect fullWidth />
              </Grid>
              <Grid item xs={3}>
                <FloorSelect fullWidth />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField maskedInputProps={{ mask: UUIDMask }} fullWidth name="uuId" label="UUID" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              maskedInputProps={{ mask: MACAddressMask }}
              fullWidth
              name="address"
              label="MAC адрес"
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="space-between" spacing={2} wrap="nowrap">
              <Grid item xs={6}>
                <TextField type="number" fullWidth name="major" label="major" />
              </Grid>
              <Grid item xs={6}>
                <TextField type="number" fullWidth name="minor" label="minor" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="space-between" spacing={2} wrap="nowrap">
              <Grid item xs={6}>
                <TextField
                  maskedInputProps={{ mask: LatLngMask }}
                  fullWidth
                  type="number"
                  name="latitude"
                  label="Широта"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  maskedInputProps={{ mask: LatLngMask }}
                  fullWidth
                  type="number"
                  name="longitude"
                  label="Долгота"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <BeaconMapPosition />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BeaconPageView;
