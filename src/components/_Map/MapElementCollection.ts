import { Layer as LeafletLayer, LeafletMouseEvent } from 'leaflet';
import { ContainerElement } from './ContainerElement';

type IDType = number | string;
type Tooltip = string | Record<string, any>;
export interface BaseEntity {
  id: IDType;
  tooltip?: Tooltip;
}

type EntityState<Entity extends BaseEntity> = Omit<Entity, 'id' | 'tooltip'>;

interface MapElement<
  Entity extends BaseEntity = BaseEntity,
  Layer extends LeafletLayer = LeafletLayer
> {
  state: EntityState<Entity>;
  layer: Layer;
  attached: boolean;
  tooltip?: Tooltip;
}

export interface MapElementFactory<Entity extends BaseEntity, Layer extends LeafletLayer> {
  entityName: string;
  createLayer(state: EntityState<Entity>): Layer;
  updateLayer(layer: Layer, state: EntityState<Entity>, nextState: EntityState<Entity>): void;
  shouldDisplayElement?: (state: EntityState<Entity>) => boolean;
}

class MapElementCollection<Entity extends BaseEntity, Layer extends LeafletLayer> {
  private container: ContainerElement;
  private elements: Map<IDType, MapElement<Entity, Layer>> = new Map();
  private factory: MapElementFactory<Entity, Layer>;

  constructor(container: ContainerElement, factory: MapElementFactory<Entity, Layer>) {
    this.container = container;
    this.factory = { ...factory };
    if (this.factory.shouldDisplayElement == null) this.factory.shouldDisplayElement = () => true;
  }

  private get parentLayer() {
    return this.container.layer;
  }

  getElementList() {
    return this.elements.values();
  }

  private addElementLayerToMap(element: MapElement) {
    if (!element.attached) {
      element.attached = true;
      this.parentLayer.addLayer(element.layer);
    }
  }
  private removeElementLayerFromMap(element: MapElement) {
    if (element.attached) {
      element.attached = false;
      this.parentLayer.removeLayer(element.layer);
    }
  }

  private createElement(state: EntityState<Entity>, tooltip?: Tooltip) {
    const { factory } = this;
    const layer = factory.createLayer(state);
    const element: MapElement<Entity, Layer> = { state, layer, attached: false, tooltip };
    layer.addEventListener('mousemove', (event: LeafletMouseEvent) => {
      if (element.tooltip)
        this.container.tooltip.open(event.originalEvent, factory.entityName, element.tooltip);
    });
    if (factory.shouldDisplayElement(state)) this.addElementLayerToMap(element);
    return element;
  }

  private updateElement(
    element: MapElement<Entity, Layer>,
    nextState: EntityState<Entity>,
    tooltip?: Tooltip
  ) {
    const { factory } = this;
    const { state, layer } = element;
    const displayElement = factory.shouldDisplayElement(nextState);
    if (!displayElement) this.removeElementLayerFromMap(element);
    factory.updateLayer(layer, state, nextState);
    if (displayElement) this.addElementLayerToMap(element);
    element.state = nextState;
    element.tooltip = tooltip;
  }

  createOrUpdateElement(id: string, state: EntityState<Entity>, tooltip?: Tooltip) {
    let element = this.elements.get(id);
    if (element === undefined) {
      element = this.createElement(state, tooltip);
      this.elements.set(id, element);
    } else this.updateElement(element, state, tooltip);
  }

  updateAll(nextEntries: Entity[]) {
    const { elements } = this;
    const newCollection: typeof elements = new Map();

    for (const entry of nextEntries) {
      const { id, tooltip, ...state } = entry;
      let element = elements.get(id) || newCollection.get(id);
      if (element === undefined) {
        element = this.createElement(state, tooltip);
        newCollection.set(id, element);
      } else {
        this.updateElement(element, state, tooltip);
        newCollection.set(id, element);
        elements.delete(id);
      }
    }

    for (const element of elements.values()) {
      this.removeElementLayerFromMap(element);
    }

    this.elements = newCollection;
  }

  getElementIdByLayer(layer: Layer) {
    for (const [id, element] of this.elements) {
      if (element.layer === layer) return id;
    }
  }

  // deleteElementById(id: IDType) {
  //   const element = this.elements.get(id);
  //   this.removeElementLayerFromMap(element);
  //   this.elements.delete(id);
  // }
}

export default MapElementCollection;
