import Leaflet, { MarkerOptions, Marker as MarkerLayer } from 'leaflet';
import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type Marker = BaseEntity & {
    latlng: LatLng;
    sos?: boolean;
  } & MarkerOptions;
}

const markerFactory: MapElementFactory<Marker, MarkerLayer> = {
  entityName: 'Marker',

  createLayer(state) {
    const { latlng, ...options } = state;
    return Leaflet.marker(latlng, options);
  },

  updateLayer(layer, state, nextState) {
    const { latlng, icon } = nextState;
    if (state.latlng[0] !== latlng[0] || state.latlng[1] !== latlng[1]) layer.setLatLng(latlng);
    if (state.icon !== icon) layer.setIcon(icon);
  },
};

export default markerFactory;
