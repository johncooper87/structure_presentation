import { Layer } from 'leaflet';
import MapTooltip from './MapTooltip';

interface ContainerLayer {
  addLayer: (layer: Layer) => void;
  removeLayer: (layer: Layer) => void;
}

export interface ContainerElement {
  readOnly layer: ContainerLayer;
  readOnly tooltip: MapTooltip;
}
