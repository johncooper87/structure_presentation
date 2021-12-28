import * as yup from 'yup';
import { DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useFormState } from 'components/Form';
import {
  Dialog,
  LinearProgress,
  DialogButton,
  Form,
  TextField,
  SubmitButton,
  ImageField,
  DistortableImageMapField,
} from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates';
import { closeDialog, refetchActiveQuery } from 'utils';
import { zoneListToPolygonList } from 'utils/zoneToPolygon';
import createSiteIndoorZone from '../../../mutations/createSiteIndoorZone';
import updateSiteIndoorZone from '../../../mutations/updateSiteIndoorZone';

function SiteIndoorZoneMapField({ bounds, polygons }: { bounds?: LatLng[]; polygons: Polygon[] }) {
  const {
    values: { image },
  } = useFormState<SiteIndoorZoneFormValues>();

  const distortableImage = useMemo(() => {
    if (image instanceof Blob) return URL.createObjectURL(image);
    return image;
  }, [image]);

  return (
    <DistortableImageMapField
      name="corners"
      bounds={bounds}
      polygons={polygons}
      distortableImage={distortableImage}
      style={{ width: '100%', height: '350px' }}
    />
  );
}

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_INDOOR_ZONES');
}

export const siteIndoorZoneVS = yup.object().shape({
  floor: yup.number().nullable().required(),
  image: yup.mixed().nullable().required(),
  corners: yup.array().length(4).nullable().required(),
});

function SiteIndoorZoneFormDialog({ allZones }: { allZones: Zone[] }) {
  const { id: siteId } = usePathParams<SitePagePathParams>();

  const { open: createDialogOpen } = useDialogState<SiteIndoorZone>('SITES/CREATE_INDOOR_ZONE');
  const { data: zone, open: editDialogOpen } =
    useDialogState<SiteIndoorZone>('SITES/EDIT_INDOOR_ZONE');
  const open = createDialogOpen || editDialogOpen;
  const title = createDialogOpen ? 'Новая зона' : 'Редактировать зону';

  const submit = createDialogOpen
    ? (data: SiteIndoorZoneSubmitData) => createSiteIndoorZone(siteId, data)
    : (data: SiteIndoorZoneSubmitData) => updateSiteIndoorZone(siteId, zone.id, data);
  const { mutate, isLoading } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  const [initialZone, bounds, polygons] = useMemo(() => {
    const polygons = zoneListToPolygonList(allZones ?? [], true);
    if (!zone) return [{}, polygons.flatMap(p => p.latlngs), polygons];
    const { coordinates, floor, id } = zone;
    const corners = coordinates?.map(({ latitude, longitude }) => [latitude, longitude] as LatLng);
    return [
      {
        image: '/api/indoor/mappictures/getfilebyindoorzoneid?indoorZoneId=' + id,
        floor,
        corners,
      },
      corners,
      polygons,
    ];
  }, [allZones, zone]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>{title}</DialogTitle>
      <Form
        initialValues={createDialogOpen ? undefined : initialZone}
        enableReinitialize
        onSubmit={mutate}
        validate={siteIndoorZoneVS}
      >
        <DialogContent style={{ width: '600px', maxWidth: '100%' }}>
          <TextField fullWidth type="number" name="floor" label="Этаж" />
          <br />
          <Typography>Схема помещения</Typography>
          <ImageField name="image" />
          <br />
          <SiteIndoorZoneMapField bounds={bounds} polygons={polygons} />
        </DialogContent>
        <DialogActions>
          <LinearProgress display={isLoading} />
          <DialogCancelButton />
          <DialogButton render={<SubmitButton template="save" />} />
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default SiteIndoorZoneFormDialog;
