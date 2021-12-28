import Leaflet from 'leaflet';
import MapElementCollection from './MapElementCollection';
import markerFactory from './factories/markerFactory';
import circleMarkerFactory from './factories/circleMarkerFactory';
import polygonFactory from './factories/polygonFactory';
import polylineFactory from './factories/polylineFactory';
// import polylineDecoratorFactory from './factories/polylineDecoratorFactory';
import MarkerClusterContainer from './MarkerClusterContainer';
import { ContainerElement } from './ContainerElement';

declare global {
  interface FeatureGroup {
    id: string;
    markers: Marker[];
    polygons: Polygon[];
    circleMarkers: CircleMarker[];
    polylines: Polyline[];
    polilineDecorators: PolylineDecorator[];
    progressivePolylines: Polyline[];
  }
}

class FeatureGroupContainer implements ContainerElement {
  readonly layer: Leaflet.FeatureGroup = Leaflet.featureGroup();
  readonly markerCluster = new MarkerClusterContainer(this);
  readonly markers = new MapElementCollection(this, markerFactory);
  readonly circleMarkers = new MapElementCollection(this, circleMarkerFactory);
  readonly polygons = new MapElementCollection(this, polygonFactory);
  readonly polylines = new MapElementCollection(this, polylineFactory);

  get tooltip() {
    return this.container.tooltip;
  }

  constructor(private container: ContainerElement) {
    container.layer.addLayer(this.layer);
  }

  readonly featureGroup: FeatureGroup;
  updateAll(featureGroup: FeatureGroup) {
    const { markers, polygons, circleMarkers, polylines } = featureGroup ?? {};
    if (polygons !== this.featureGroup?.polygons)
      this.polygons.updateAll(polygons == null ? [] : polygons);
    if (markers !== this.featureGroup?.markers)
      this.markers.updateAll(markers == null ? [] : markers);
    if (circleMarkers !== this.featureGroup?.circleMarkers)
      this.circleMarkers.updateAll(circleMarkers == null ? [] : circleMarkers);
    if (polylines !== this.featureGroup?.polylines)
      this.polylines.updateAll(polylines == null ? [] : polylines);
    // @ts-expect-error
    this.featureGroup = featureGroup;
  }
}

export default FeatureGroupContainer;
