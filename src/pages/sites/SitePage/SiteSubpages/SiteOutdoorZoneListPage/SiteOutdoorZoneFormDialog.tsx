import * as yup from 'yup';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useFormState, useForm } from 'components/Form';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
// eslint-disable-next-line import/no-extraneous-dependencies
import { point, polygon } from '@turf/helpers';
import {
  Dialog,
  LinearProgress,
  DialogButton,
  Form,
  TextField,
  MapField,
  getColor,
  allColors,
  SelectItem,
  SubmitButton,
} from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton, ColorSelect, ColorSelectItem } from 'templates';
import { closeDialog, refetchActiveQuery } from 'utils';
import { zoneListToPolygonList, zoneToPolygon } from 'utils/zoneToPolygon';
import createSiteOutdoorZone from '../../../mutations/createSiteOutdoorZone';
import updateSiteOutdoorZone from '../../../mutations/updateSiteOutdoorZone';

function SiteOutdoorZoneMapField({ bounds, polygons }: { bounds?: LatLng[]; polygons: Polygon[] }) {
  const form = useForm();
  const {
    values: { features, color },
  } = useFormState<SiteOutdoorZoneFormValues>();

  useEffect(() => {
    const polygon = features?.polygons?.[0];
    if (polygon && polygon.color !== color)
    form.change('features', {
        polygons: [
          {
            ...polygon,
            color,
            // fillOpacity: 0.8,
          },
        ],
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const totalPolygons = features?.polygons?.length ?? 0;
  const drawingOptions = useMemo(
    () =>
      ({
        draw:
          totalPolygons === 1
            ? undefined
            : {
                polygon: {
                  shapeOptions: {
                    color,
                    opacity: 0.9,
                    fillOpacity: 0.5,
                  },
                },
                polyline: false,
                marker: false,
                rectangle: false,
                circle: false,
                circlemarker: false,
              },
        edit:
          totalPolygons === 1
            ? undefined
            : {
                edit: false,
                remove: false,
              },
      } as LeafletDrawingOptions),
    [totalPolygons, color]
  );
  return (
    <MapField
      name="features"
      polygons={polygons}
      bounds={bounds}
      drawingOptions={drawingOptions}
      style={{ width: '100%', height: '350px' }}
      onDrawVertex={(event, handler) => {
        if (polygons.length === 0) return;
        const firstPolygon = polygons[0];
        const drawLayers = event.layers.getLayers();
        // @ts-expect-error
        const lastDrawPoint = drawLayers[drawLayers?.length - 1].getLatLng();
        if (
          booleanPointInPolygon(
            point([lastDrawPoint.lat, lastDrawPoint.lng]),
            polygon([[...firstPolygon.latlngs, firstPolygon.latlngs[0]]])
          )
        )
          return;
        if (drawLayers.length === 1)
          setTimeout(() => {
            handler.disable();
            handler.enable();
          });
        else handler.deleteLastVertex();
      }}
      onEditVertex={(event, handler) => {
        if (polygons.length === 0) return;
        const firstPolygon = polygons[0];
        const poly = polygon([[...firstPolygon.latlngs, firstPolygon.latlngs[0]]]);
        const points = event.poly.getLatLngs()[0];
        // @ts-expect-error
        for (const polyPoint of points) {
          if (!booleanPointInPolygon(point([polyPoint.lat, polyPoint.lng]), poly)) {
            // @ts-expect-error
            if (handler.custom_lastPoints) {
              // @ts-expect-error
              const layer = handler._featureGroup.getLayers()[0];
              // @ts-expect-error
              handler._uneditedLayerProps[layer._leaflet_id].latlngs = [
                // @ts-expect-error
                ...handler.custom_lastPoints.map(p => ({ ...p })),
              ];
            }
            setTimeout(() => {
              // @ts-expect-error
              handler.revertLayers();
              handler.disable();
              handler.enable();
            });
            return;
          }
        }
        // @ts-expect-error
        handler.custom_lastPoints = handler._featureGroup
          .getLayers()[0]
          .getLatLngs()[0]
          .map(({ lat, lng }) => ({ lat, lng }));
      }}
    />
  );
}

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_ZONES');
}

const initialValues = {
  color: getColor(4),
};

export const siteOutdoorZoneVS = yup.object().shape({
  name: yup.string().nullable().required(),
  color: yup.string().nullable().required(),
  features: yup
    .object()
    // @ts-expect-error
    .test('testFeatureGroup', 'Необходимо добавить зону', (value: FeatureGroup) => {
      if (value?.polygons?.length > 0) return true;
    }),
});

function SiteOutdoorZoneFormDialog({ allZones }: { allZones: Zone[] }) {
  const { id: siteId } = usePathParams<SitePagePathParams>();

  const { open: createDialogOpen } = useDialogState<Zone>('SITES/CREATE_ZONE');
  const { data: zone, open: editDialogOpen } = useDialogState<Zone>('SITES/EDIT_ZONE');
  const open = createDialogOpen || editDialogOpen;
  const title = createDialogOpen ? 'Новая зона' : 'Редактировать зону';

  const submit = createDialogOpen
    ? (data: SiteOutdoorZoneSubmitData) => createSiteOutdoorZone(siteId, data)
    : (data: SiteOutdoorZoneSubmitData) => updateSiteOutdoorZone(siteId, zone.id, data);
  const { mutate, isLoading } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  const [initialZone, bounds, additionalColor, polygons] = useMemo(() => {
    const polygons = zoneListToPolygonList(
      (zone ? allZones?.filter(z => z.id !== zone.id) : allZones) ?? [],
      true
      // 0.5
    );
    if (!zone) return [{}, polygons.flatMap(p => p.latlngs), null, polygons];
    const polygon = zoneToPolygon(zone);
    const { color } = polygon;
    return [
      {
        ...zone,
        color,
        features: {
          polygons: [polygon],
        },
      },
      polygon.latlngs,
      allColors.includes(color) ? null : (
        <SelectItem value={color}>
          <ColorSelectItem value={color} />
        </SelectItem>
      ),
      polygons,
    ];
  }, [allZones, zone]);

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>{title}</DialogTitle>
      <Form
        initialValues={createDialogOpen ? initialValues : initialZone}
        enableReinitialize
        onSubmit={mutate}
        validate={siteOutdoorZoneVS}
      >
        <DialogContent style={{ width: '600px', maxWidth: '100%' }}>
          <TextField fullWidth name="name" label="Название" />
          <br />
          <ColorSelect>{additionalColor}</ColorSelect>
          <br />
          <SiteOutdoorZoneMapField bounds={bounds} polygons={polygons} />
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

export default SiteOutdoorZoneFormDialog;
