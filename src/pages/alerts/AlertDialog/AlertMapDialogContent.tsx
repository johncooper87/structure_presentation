import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import RespondeIcon from '@material-ui/icons/Feedback';

import { DialogButton } from 'components';
import MapContainer from 'components/_Map';
import { workerSuccessIcon, workerAlertIcon } from 'components/MapElements/WorkerMarker';
import { useDialogState } from 'hooks';
import { openDialog, http } from 'utils';
import { DialogCancelButton } from 'templates/actions';
import fetchSiteIndoorZoneImage from 'pages/sites/queries/fetchSiteIndoorZoneImage';

function AlertMapDialog() {
  const { data: alert } = useDialogState<AlertDTO>('ALERTS/MAP');
  const handleResponde = () => openDialog('ALERTS/RESPONDE', alert);

  const { indoorZoneId } = alert ?? {};
  const { data: indoorZone } = useQuery(
    ['INDOOR_ZONE_MAP/INDOOR_ZONE', indoorZoneId],
    async () => {
      return (await http.get('/api/indoor/mappictures/' + indoorZoneId)) as SiteIndoorZone;
    },
    { enabled: Boolean(indoorZoneId) }
  );

  const { data: zoneImage } = useQuery(
    ['INDOOR_ZONE_MAP/ZONE_IMAGE', indoorZone?.id],
    () => fetchSiteIndoorZoneImage(indoorZone.id),
    { enabled: Boolean(indoorZone), staleTime: 1000 * 60 * 10 }
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

  const { markers, polygons } = useMemo(() => {
    if (alert == null) return {};
    const { location, isLooked, zones } = alert;
    const marker: Marker = {
      id: 'worker',
      latlng: location,
      icon: isLooked ? workerSuccessIcon : workerAlertIcon,
    };
    const polygons: Polygon[] = zones.map(({ name, states, color: [red, green, blue, alpha] }) => ({
      id: name,
      latlngs: states[0].points,
      color: `rgba(${red},${green},${blue},${alpha})`,
    }));
    return {
      markers: [marker],
      polygons: alert.indoorZoneId ? undefined : polygons,
    };
  }, [alert]);

  return (
    <>
      <DialogTitle>Тревога на карте</DialogTitle>

      <DialogContent>
        <MapContainer
          {...{ markers, polygons }}
          distortableImage={indoorZoneId && indoorZone && zoneImage ? zoneImage : undefined}
          editableImage={false}
          corners={corners}
          center={alert?.location}
          bounds="markers"
        />
        <div style={{ marginTop: '12px' }}>{alert?.isLooked && alert.comment}</div>
      </DialogContent>

      <DialogActions>
        <DialogCancelButton>{alert?.isLooked ? 'Закрыть' : 'Отмена'}</DialogCancelButton>
        {!alert?.isLooked && (
          <DialogButton onClick={handleResponde}>
            <RespondeIcon className="leading-icon" />
            Отреагировать
          </DialogButton>
        )}
      </DialogActions>
    </>
  );
}

export default AlertMapDialog;
