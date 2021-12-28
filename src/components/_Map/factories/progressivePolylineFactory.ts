import Leaflet, { PolylineOptions, Polyline as PolylineLayer, Pattern } from 'leaflet';
import 'leaflet-hotline';
import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type Polyline = BaseEntity & {
    latlngs: LatLng[];
    decoratorPatterns?: Pattern[];
  } & PolylineOptions;
}

const progressivePolylineFactory: MapElementFactory<Polyline, PolylineLayer> = {
  entityName: 'Polyline',

  createLayer(state) {
    const { latlngs } = state;
    // @ts-ignore
    return Leaflet.hotline(latlngs,
      {
        weight: 4,
        outlineWidth: 0,
        smoothFactor: 0,
        palette: {
          0: 'rgb(0, 21, 158)',
          0.3: 'rgb(0, 224, 19)',
          0.6: 'rgb(234, 255, 0)',
          1: 'rgb(219, 0, 0)',
        },
        opacity: 0.2,
      }
    );
  },

  updateLayer(layer, state, nextState) {
    const { latlngs } = nextState;

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
  },
};

export default progressivePolylineFactory;
