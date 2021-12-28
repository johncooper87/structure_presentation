import Leaflet, { PolylineOptions, Polygon as PolygonLayer } from 'leaflet';
import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type Polygon = BaseEntity & {
    latlngs: LatLng[];
  } & PolylineOptions;
}

const polygonFactory: MapElementFactory<Polygon, PolygonLayer> = {
  entityName: 'Polygon',

  createLayer(state) {
    const { latlngs, ...options } = state;
    return Leaflet.polygon(latlngs, options);
  },

  updateLayer(layer, state, nextState) {
    const { latlngs, color, fillOpacity } = nextState;
    for (const key in latlngs) {
      const latlng = state.latlngs[key];
      const nextLatlng = latlngs[key];
      if (latlng[0] !== nextLatlng[0] || latlng[1] !== nextLatlng[1]) {
        layer.setLatLngs(latlngs);
        break;
      }
      if (state.color !== color) layer.setStyle({ color });
      if (state.fillOpacity !== fillOpacity) layer.setStyle({ fillOpacity });
    }
  },
};

export default polygonFactory;
