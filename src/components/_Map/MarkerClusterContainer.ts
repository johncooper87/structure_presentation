import Leaflet, { LeafletMouseEvent, MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MapElementCollection from './MapElementCollection';
import markerFactory from './factories/markerFactory';
import { ContainerElement } from './ContainerElement';

class MarkerClusterContainer implements ContainerElement {
  layer = Leaflet.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false,
    maxClusterRadius: 20,
  });
  readonly markers = new MapElementCollection(this, markerFactory);

  constructor(private container: ContainerElement) {
    this.layer.addEventListener('clustermouseover', (event: LeafletMouseEvent) => {
      const markerLayers = (event.sourceTarget as MarkerClusterGroup).getAllChildMarkers();
      let tooltips = [];
      for (const element of this.markers.getElementList()) {
        if (markerLayers.includes(element.layer)) tooltips.push(element.tooltip);
      }
      tooltips = tooltips.filter(item => item);
      if (tooltips.length > 0) this.tooltip.open(event.originalEvent, 'MarkerCluster', tooltips);
    });
  }

  get tooltip() {
    return this.container.tooltip;
  }
}

export default MarkerClusterContainer;
