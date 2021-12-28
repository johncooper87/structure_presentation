import Leaflet, {
  PolylineDecoratorOptions,
  Polyline as PolylineLayer,
  PolylineDecorator as PolylineDecoratorLayer,
} from 'leaflet';
import 'leaflet-polylinedecorator';

import { BaseEntity, MapElementFactory } from '../MapElementCollection';

declare global {
  type PolylineDecorator = BaseEntity & {
    polylineLayer: PolylineLayer;
  } & PolylineDecoratorOptions;
}

const polylineDecoratorFactory: MapElementFactory<PolylineDecorator, PolylineDecoratorLayer> = {
  entityName: 'PolylineDecorator',

  createLayer(state) {
    const { polylineLayer, ...options } = state;
    return Leaflet.polylineDecorator(polylineLayer, options);
  },

  updateLayer(layer, state, nextState) {
    const { polylineLayer, patterns } = nextState;
    if (state.polylineLayer !== polylineLayer) layer.setPaths(polylineLayer);
    if (state.patterns !== patterns) layer.setPatterns(patterns);
  },
};

export default polylineDecoratorFactory;
