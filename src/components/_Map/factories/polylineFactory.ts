import Leaflet, { PolylineOptions, Polyline as PolylineLayer, Pattern } from 'leaflet';
import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type Polyline = BaseEntity & {
    latlngs: LatLng[];
    decoratorPatterns?: Pattern[];
  } & PolylineOptions;
}

const polylineFactory: MapElementFactory<Polyline, PolylineLayer> = {
  entityName: 'Polyline',

  createLayer(state) {
    const { latlngs, ...options } = state;
    return Leaflet.polyline(latlngs, options);
  },

  updateLayer(layer, state, nextState) {
    const { latlngs, color } = nextState;

    if (state.latlngs.length !== nextState.latlngs.length) layer.setLatLngs(nextState.latlngs);
    else {
      for (const key in latlngs) {
        const latlng = state.latlngs[key];
        const nextLatlng = latlngs[key];
        if (latlng[0] !== nextLatlng[0] || latlng[1] !== nextLatlng[1]) {
          layer.setLatLngs(latlngs);
          break;
        }
      }
    }

    if (state.color !== color) layer.setStyle({ color });
  },
};

export default polylineFactory;
