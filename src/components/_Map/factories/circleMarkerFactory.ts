import Leaflet, { CircleMarkerOptions, CircleMarker as CircleMarkerLayer } from 'leaflet';
import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type CircleMarker = BaseEntity & {
    latlng: LatLng;
  } & CircleMarkerOptions;
}

const markerFactory: MapElementFactory<CircleMarker, CircleMarkerLayer> = {
  entityName: 'CircleMarker',

  createLayer(state) {
    const { latlng, ...options } = state;
    return Leaflet.circleMarker(latlng, options);
  },

  updateLayer(layer, state, nextState) {
    const { latlng, color, radius } = nextState;
    if (state.latlng[0] !== latlng[0] || state.latlng[1] !== latlng[1]) layer.setLatLng(latlng);
    if (state.radius !== radius) layer.setRadius(radius);
    if (state.color !== color) layer.setStyle({ color });
  },
};

export default markerFactory;
