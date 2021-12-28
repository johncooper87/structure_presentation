import Leaflet from 'leaflet';
import { useLayout } from 'hooks';
import MapContainer from './MapContainer';

const MoscowCenterLatlng: LatLng = [55.7558, 37.6173];
const defaultZoom: number = 13;

export interface BaseMapProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> {
  center?: LatLng;
  zoom?: number;
  markers?: Marker[];
  selectedWorker?: Marker;
  polygons?: Polygon[];
  polylines?: Polyline[];
  circleMarkers?: CircleMarker[];
  bounds?: 'all' | 'markers' | 'polygons' | [number, number][];
  markerCluster?: boolean;
  renderTooltip?: TooltipRenderFn;
  disabled?: boolean;
  drawingOptions?: LeafletDrawingOptions;
  onEditableElementsChange?: LeafletEditableElementsChangeHandler;
  editableElements?: FeatureGroup;
  distortableImage?: string;
  onDistortImage?: (corners: [LatLng, LatLng, LatLng, LatLng]) => void;
  corners?: [LatLng, LatLng, LatLng, LatLng];
  editableImage?: boolean;
  editableImageZIndex?: number;
  onClick?: (event: Leaflet.LeafletMouseEvent) => void;
  onDrawVertex?: (event: Leaflet.DrawEvents.DrawVertex, handler: Leaflet.Draw.Polygon) => void;
  onEditVertex?: (event: Leaflet.DrawEvents.EditVertex, handler: Leaflet.Draw.Polygon) => void;
  maxZoom?: number;
  progressiveTrack?: boolean;
}

function BaseMap({
  markers = [],
  polygons,
  polylines,
  circleMarkers,
  center = MoscowCenterLatlng,
  zoom = defaultZoom,
  bounds,
  markerCluster,
  renderTooltip,
  disabled,
  drawingOptions,
  editableElements,
  onEditableElementsChange,
  onBlur,
  distortableImage,
  onDistortImage,
  corners,
  editableImage,
  editableImageZIndex,
  onClick,
  onDrawVertex,
  onEditVertex,
  maxZoom = 25,
  selectedWorker,
  progressiveTrack,
  ...props
}: BaseMapProps) {
  const current = useMemo(() => new MapContainer(), []);
  current.tooltip.renderFn = renderTooltip;

  useEffect(() => {
    current.maxZoom = maxZoom;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxZoom]);

  useEffect(() => {
    current.polygons.updateAll(polygons == null ? [] : polygons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polygons]);

  useEffect(() => {
    const alertMarkers = [];
    const notAlertMarkers = [];

    if (selectedWorker) {
      if (selectedWorker?.sos) {
        alertMarkers.push(selectedWorker);
      } else {
        notAlertMarkers.push(selectedWorker);
      }
    } else {
      const { alertMarkers: aM, notAlertMarkers: notAM } = markers.reduce(
        ({ alertMarkers, notAlertMarkers }, curr) => {
          if (curr.sos) {
            return { alertMarkers: [...alertMarkers, curr], notAlertMarkers };
          }
          return { alertMarkers, notAlertMarkers: [...notAlertMarkers, curr] };
        },
        { alertMarkers: [], notAlertMarkers: [] }
      );
      alertMarkers.push(...aM);
      notAlertMarkers.push(...notAM);
    }
    current.markers.updateAll(markerCluster ? [] : notAlertMarkers);
    current.markerCluster.markers.updateAll(!markerCluster ? [] : notAlertMarkers);
    current.alertMarkers.updateAll(markerCluster ? [] : alertMarkers);
    current.alertMarkerCluster.markers.updateAll(!markerCluster ? [] : alertMarkers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, markerCluster]);

  useEffect(() => {
    current.circleMarkers.updateAll(circleMarkers == null ? [] : circleMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleMarkers]);

  useEffect(() => {
    if (!progressiveTrack) {
      current.polylines.updateAll(polylines == null ? [] : polylines);
      current.polylineDecorators.updateAll(
        polylines == null
          ? []
          : polylines
              .filter(polyline => polyline.decoratorPatterns)
              .map(({ id, decoratorPatterns }) => ({
                id,
                // @ts-expect-error
                polylineLayer: current.polylines.elements.get(id).layer,
                patterns: decoratorPatterns,
              }))
      );
      current.progressivePolylines.updateAll([]);
    } else {
      current.polylines.updateAll([]);
      current.polylineDecorators.updateAll([]);
      current.progressivePolylines.updateAll(polylines == null ? [] : polylines);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressiveTrack, polylines]);

  useEffect(() => {
    const { layer: map } = current;
    map.setView(center || map.getCenter(), zoom || map.getZoom());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center?.[0], center?.[1], zoom]);

  useEffect(() => {
    const { layer: map } = current;
    const maxZoom = 19;
    const options = { maxZoom };
    if (!selectedWorker) {
      switch (bounds) {
        case 'all': {
          if (markers?.length > 0 || polygons?.length > 0)
            map.fitBounds(
              [
                ...(markers?.map(m => m.latlng) ?? []),
                ...(polygons?.flatMap(m => m.latlngs) ?? []),
              ],
              options
            );
          break;
        }
        case 'markers': {
          if (markers?.length > 0)
            map.fitBounds(
              markers?.map(m => m.latlng),
              options
            );
          break;
        }
        case 'polygons': {
          if (polygons?.length > 0)
            map.fitBounds(
              polygons?.flatMap(m => m.latlngs),
              options
            );
          break;
        }
        default: {
          if (bounds != null && bounds?.length > 0) map.fitBounds(bounds, options);
        }
      }
    } else {
      map.flyTo(selectedWorker.latlng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, selectedWorker]);

  useEffect(() => {
    current.disabled = disabled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  useEffect(() => {
    current.drawingOptions = drawingOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawingOptions]);

  current.onEditableElementsChange = onEditableElementsChange;
  useEffect(() => {
    current.editableElements = editableElements;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableElements]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!current.rootNode.contains(event.relatedTarget as Element)) onBlur?.(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur]
  );

  current.onDistortImage = onDistortImage;
  useEffect(() => {
    current.editableImage = editableImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableImage]);
  useEffect(() => {
    current.corners = corners;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corners]);
  useEffect(() => {
    current.distortableImage = distortableImage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distortableImage]);
  useEffect(() => {
    current.editableImageZIndex = editableImageZIndex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editableImageZIndex]);

  current.onClick = onClick;
  current.onDrawVertex = onDrawVertex;
  current.onEditVertex = onEditVertex;

  const layout = useLayout();
  const style =
    layout === 'mobile' ? { height: '300px', width: '300px' } : { height: '500px', width: '500px' };

  return (
    <div
      className="map-container"
      style={style}
      onBlur={handleBlur}
      {...props}
      ref={current.appendMap}
    />
  );
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    setTimeout(() => this.setState({ hasError: false }), 1000);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function LeafletMap(props: BaseMapProps) {
  return (
    <ErrorBoundary>
      <BaseMap {...props} />
    </ErrorBoundary>
  );
}

export default LeafletMap;
