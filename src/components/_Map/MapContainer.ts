import Leaflet, { Map, TileLayer, LayersControlEvent, CRS, Layer } from 'leaflet';
import screenfull from 'screenfull';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.vectorgrid';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'leaflet-toolbar';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'leaflet-toolbar/dist/leaflet.toolbar.css';
import 'leaflet-distortableimage';
import 'leaflet-distortableimage/dist/leaflet.distortableimage.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetinaIcon from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowIcon from 'leaflet/dist/images/marker-shadow.png';

import tiles from './tiles';
import MapElementCollection from './MapElementCollection';
import markerFactory from './factories/markerFactory';
import circleMarkerFactory from './factories/circleMarkerFactory';
import polygonFactory from './factories/polygonFactory';
import polylineFactory from './factories/polylineFactory';
import progressivePolylineFactory from './factories/progressivePolylineFactory';
import polylineDecoratorFactory from './factories/polylineDecoratorFactory';
import MapTooltip from './MapTooltip';
import MarkerClusterContainer from './MarkerClusterContainer';
import FeatureGroupContainer from './FeatureGroupContainer';
import { ContainerElement } from './ContainerElement';
import vectorTileLayerStyles from './vectorTileStyles';
import styles from './styles.module.scss';

window.screenfull = screenfull;
// const includeFeatures = Object.keys(vectorTileLayerStyles);

const L = Leaflet as any;

delete Leaflet.Icon.Default.prototype['_getIconUrl'];
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetinaIcon,
  shadowUrl: markerShadowIcon,
});

// draw locale
Leaflet.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон';

Leaflet.drawLocal.draw.toolbar.finish.text = 'Сохранить';
Leaflet.drawLocal.draw.toolbar.actions.text = 'Отмена';
Leaflet.drawLocal.draw.toolbar.undo.text = 'Удалить последнюю точку';

Leaflet.drawLocal.draw.handlers.polygon.tooltip.start = 'Кликните чтобы начать рисовать';
Leaflet.drawLocal.draw.handlers.polygon.tooltip.cont = 'Кликните чтобы продолжить рисовать';
Leaflet.drawLocal.draw.handlers.polygon.tooltip.end =
  'Кликните первую точку чтобы закончить рисовать';

// edit locale
Leaflet.drawLocal.edit.toolbar.buttons.edit = 'Редактировать';
Leaflet.drawLocal.edit.toolbar.buttons.editDisabled = 'Нечего редактировать';
Leaflet.drawLocal.edit.toolbar.buttons.remove = 'Удалить';
Leaflet.drawLocal.edit.toolbar.buttons.removeDisabled = 'Нечего удалять';

Leaflet.drawLocal.edit.toolbar.actions.save.text = 'Сохранить';
Leaflet.drawLocal.edit.toolbar.actions.cancel.text = 'Отмена';
Leaflet.drawLocal.edit.toolbar.actions.clearAll.text = 'Очистить все';

Leaflet.drawLocal.edit.handlers.remove.tooltip.text = 'Кликните на объект, чтобы удалить';
Leaflet.drawLocal.edit.handlers.edit.tooltip.subtext = 'Нажмите отмена, чтобы сбросить изменения';
Leaflet.drawLocal.edit.handlers.edit.tooltip.text =
  'Перетащите вершины или маркеры, чтобы редактировать объект';

class MapContainer implements ContainerElement {
  readonly rootNode = document.createElement('div');
  readonly layer: Map = Leaflet.map(this.rootNode, {
    fullscreenControl: true,
  });
  readonly markerCluster = new MarkerClusterContainer(this);
  readonly alertMarkerCluster = new MarkerClusterContainer(this);
  readonly markers = new MapElementCollection(this, markerFactory);
  readonly alertMarkers = new MapElementCollection(this, markerFactory);
  readonly circleMarkers = new MapElementCollection(this, circleMarkerFactory);
  readonly polygons = new MapElementCollection(this, polygonFactory);
  readonly polylines = new MapElementCollection(this, polylineFactory);
  readonly progressivePolylines = new MapElementCollection(this, progressivePolylineFactory);
  readonly polylineDecorators = new MapElementCollection(this, polylineDecoratorFactory);
  readonly tooltip = new MapTooltip();
  private interval: number = null;
  private mounted: boolean = false;
  onClick: (event: Leaflet.LeafletMouseEvent) => void;
  onDrawVertex: (event: Leaflet.DrawEvents.DrawVertex, handler: Leaflet.Draw.Polygon) => void;
  onEditVertex: (event: Leaflet.DrawEvents.EditVertex, handler: Leaflet.Draw.Polygon) => void;

  private initialize(node: HTMLElement) {
    const { layer: map } = this;
    map.addLayer(this.markerCluster.layer);
    map.addLayer(this.alertMarkerCluster.layer);
    // map.addControl(new Leaflet.Control.FullScreen());

    map.attributionControl.remove();
    // this.rootNode.addEventListener('wheel', event => {
    //   const { clientX, clientY } = event;
    //   this.tooltip.move(clientX, clientY);
    // });
    let lastMouseMoveTimeout = null;
    const showTooltip = () => this.tooltip.show();
    this.rootNode.addEventListener('mousemove', event => {
      this.tooltip.hide();
      // const { clientX, clientY } = event;
      // this.tooltip.move(clientX, clientY);
      clearTimeout(lastMouseMoveTimeout);
      lastMouseMoveTimeout = setTimeout(showTooltip, 200);
    });

    const tileControls = {};
    let defaultTileLayer: TileLayer;
    for (const tile of tiles) {
      const { name, url, vector, ...options } = tile;
      let layer: TileLayer;
      if (vector) {
        // @ts-expect-error
        layer = Leaflet.vectorGrid.protobuf(url, {
          // @ts-expect-error
          rendererFactory: Leaflet.canvas.tile,
          // interactive: true,
          vectorTileLayerStyles,
          // style: 'mapbox://styles/mapbox/streets-v9',
          ...options,
          style: 'mapbox://styles/mapbox/streets-v9',
          // getFeatureId(feature: any) {
          //   const id = feature.properties.class;
          //   if (includeFeatures.includes(id)) return id;
          //   return 'hz';
          // },
        });
        // // @ts-expect-error
        // layer.setFeatureStyle('hz', []);
      } else layer = Leaflet.tileLayer(url, options);
      if (defaultTileLayer === undefined) defaultTileLayer = layer;
      tileControls[name] = layer;
    }
    map.addLayer(defaultTileLayer);
    Leaflet.control.layers(tileControls).addTo(map);

    map.addEventListener('baselayerchange', (event: LayersControlEvent) => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const tile = tiles.find(tile => tile.name === event.name);
      if (tile.crs != null) map.options.crs = tile.crs;
      else map.options.crs = CRS.EPSG3857;
      map.setView(center, zoom);
    });

    this.rootNode.classList.add(styles.rootNode);
    node.appendChild(this.rootNode);
    this.tooltip.appendToBody();

    let sizes = this.rootNode.getBoundingClientRect();
    this.interval = window.setInterval(() => {
      if (!this.mounted) return;
      const newSizes = this.rootNode.getBoundingClientRect();
      if (newSizes.height !== sizes.height || newSizes.width !== sizes.width) {
        sizes = newSizes;
        this.layer.invalidateSize();
      }
    }, 1000);

    map.on('draw:created', (event: Leaflet.DrawEvents.Created) => {
      switch (event.layerType) {
        case 'polygon': {
          const layer = event.layer as Leaflet.Polygon;
          const newPolygon: Polygon = {
            id: new Date().getTime(),
            color: layer.options.color,
            fillOpacity: layer.options.fillOpacity,
            // @ts-expect-error
            latlngs: layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]),
          };
          const featureGroup = this._editableElements.featureGroup;
          const polygons = featureGroup?.polygons ?? [];
          this.onEditableElementsChange({
            ...featureGroup,
            polygons: [...polygons, newPolygon],
          });
          break;
        }
      }
      // this._editableLayers.layer.addLayer(e.layer);
    });

    map.on('draw:deleted', (event: Leaflet.DrawEvents.Deleted) => {
      const layers = event.layers;
      const { _editableElements } = this;
      const elements: FeatureGroup = { ..._editableElements.featureGroup };
      layers.eachLayer(layer => {
        if (layer instanceof Leaflet.Polygon) {
          const id = _editableElements.polygons.getElementIdByLayer(layer);
          const index = elements.polygons.findIndex(el => el.id === id);
          elements.polygons = [
            ...elements.polygons.slice(0, index),
            ...elements.polygons.slice(index + 1),
          ];
          // _editableElements.polygons.deleteElementById(id);
        }
      });
      this.onEditableElementsChange(elements);
    });

    map.on('draw:edited', (event: Leaflet.DrawEvents.Deleted) => {
      const layers = event.layers;
      const { _editableElements } = this;
      const elements: FeatureGroup = { ..._editableElements.featureGroup };
      layers.eachLayer(layer => {
        if (layer instanceof Leaflet.Polygon) {
          const id = _editableElements.polygons.getElementIdByLayer(layer);
          const index = elements.polygons.findIndex(el => el.id === id);
          elements.polygons[index] = {
            ...elements.polygons[index],
            color: layer.options.color,
            fillOpacity: layer.options.fillOpacity,
            // @ts-expect-error
            latlngs: layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]),
          };
        }
      });
      this.onEditableElementsChange(elements);
    });

    map.on('click', (event: Leaflet.LeafletMouseEvent) => {
      this.onClick?.(event);
    });

    map.on('draw:drawvertex', (event: Leaflet.DrawEvents.DrawVertex) => {
      // @ts-expect-error
      this.onDrawVertex?.(event, this._drawControl._toolbars.draw._modes.polygon.handler);
    });

    map.on('draw:editvertex', (event: Leaflet.DrawEvents.EditVertex) => {
      // @ts-expect-error
      this.onEditVertex?.(event, this._drawControl._toolbars.edit._modes.edit.handler);
    });

    const beaconsPane = map.createPane('beacons');
    beaconsPane.style.zIndex = '400';

    // map.options.maxZoom = 25;
  }

  set maxZoom(value: number) {
    this.layer.options.maxZoom = value;
  }

  onEditableElementsChange: LeafletEditableElementsChangeHandler = () => undefined;

  constructor() {
    this.appendMap = this.appendMap.bind(this);
    this.mouseupCallback = this.mouseupCallback.bind(this);
  }

  async appendMap(node: HTMLElement) {
    if (node !== null) {
      this.initialize(node);
      this.mounted = true;
    } else {
      this.mounted = false;
      setTimeout(() => {
        try {
          this.tooltip.removeFromBody();
          this.layer.remove();
        } catch (err) {
          //
        }
      });
      clearInterval(this.interval);
    }
  }

  private enable() {
    const { layer, rootNode } = this;
    layer.dragging.enable();
    layer.touchZoom.enable();
    layer.doubleClickZoom.enable();
    layer.scrollWheelZoom.enable();
    layer.boxZoom.enable();
    layer.keyboard.enable();
    if (layer.tap) layer.tap.enable();
    rootNode.style.cursor = 'grab';
  }
  private disable() {
    const { layer, rootNode } = this;
    layer.dragging.disable();
    layer.touchZoom.disable();
    layer.doubleClickZoom.disable();
    layer.scrollWheelZoom.disable();
    layer.boxZoom.disable();
    layer.keyboard.disable();
    if (layer.tap) layer.tap.disable();
    rootNode.style.cursor = 'default';
  }
  private _disabled = false;
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this._disabled === value) return;
    if (value) this.disable();
    else this.enable();
  }

  private _editableElements = new FeatureGroupContainer(this);
  get editableElements() {
    return this._editableElements.featureGroup;
  }
  set editableElements(value: FeatureGroup) {
    if (value === this._editableElements.featureGroup) return;
    this._editableElements.updateAll(value);
  }

  private _drawControl: Leaflet.Control;
  private _drawingOptions: LeafletDrawingOptions;
  get drawingOptions() {
    return this._drawingOptions;
  }
  set drawingOptions(value: LeafletDrawingOptions) {
    if (this._drawingOptions === value) return;
    if (this._drawControl !== undefined) this.layer.removeControl(this._drawControl);
    if (value) {
      this._drawControl = new Leaflet.Control.Draw({
        ...value,
        edit: {
          ...value.edit,
          featureGroup: this._editableElements.layer,
        },
      });
      this.layer.addControl(this._drawControl);

      // refactor needed
      try {
        const editHandler: Leaflet.Draw.Polygon =
          // @ts-expect-error
          this._drawControl._toolbars.edit._modes.edit.handler;
        let startPoly: any = null;
        // @ts-expect-error
        this._drawControl._container
          .getElementsByClassName('leaflet-draw-edit-edit')[0]
          .addEventListener('click', () => {
            // @ts-expect-error
            startPoly = editHandler._featureGroup
              .getLayers()[0]
              .getLatLngs()[0]
              .map(({ lat, lng }) => ({ lat, lng }));
          });
        // @ts-expect-error
        editHandler.on('enabled', () => {
          // @ts-expect-error
          this._drawControl._toolbars.edit._actionButtons[1].button.addEventListener(
            'click',
            () => {
              // @ts-expect-error
              const layer = editHandler._featureGroup.getLayers()[0];
              // @ts-expect-error
              editHandler._uneditedLayerProps[layer._leaflet_id] = {};
              // @ts-expect-error
              editHandler._uneditedLayerProps[layer._leaflet_id].latlngs = [
                ...startPoly.map(p => ({ ...p })),
              ];
              // @ts-expect-error
              editHandler.revertLayers();
              // @ts-expect-error
              editHandler._uneditedLayerProps[layer._leaflet_id] = undefined;
              // @ts-expect-error
              editHandler.custom_lastPoints = undefined;
            }
          );
        });
      } catch {
        //
      }
      //
    } else {
      this._drawControl = undefined;
    }
  }

  private _distortableImageLayer: Layer & any;
  private _distortableImageSrc: string;
  private _corners: [LatLng, LatLng, LatLng, LatLng];
  onDistortImage: (corners: [LatLng, LatLng, LatLng, LatLng]) => void;
  get distortableImage() {
    return this._distortableImageSrc;
  }
  set distortableImage(value: string) {
    if (this._distortableImageSrc === value) return;
    if (this._distortableImageLayer != null) {
      this.layer.removeLayer(this._distortableImageLayer);
      // this._distortableImageLayer.clearAllEventListeners();
      // const img: HTMLImageElement = this._distortableImageLayer._image;
      // img.parentNode?.removeChild(img);
    }
    if (value) {
      this._distortableImageSrc = value;
      this._distortableImageLayer = L.distortableImageOverlay(value, {
        selected: true,
        translation: {
          distortImage: 'Искривить',
          dragImage: 'Передвинуть',
          lockMode: 'Заблокировать редактирование',
          makeImageOpaque: 'Сделать не прозрачной',
          makeImageTransparent: 'Сделать прозрачной',
          rotateImage: 'Повернуть',
          freeRotateImage: 'Повернуть свободно',
          scaleImage: 'Масштабировать',
        },
        actions: [
          L.DragAction,
          L.ScaleAction,
          L.DistortAction,
          L.RotateAction,
          L.FreeRotateAction,
          L.LockAction,
          L.OpacityAction,
        ],
        corners: this._corners ?? undefined,
        editable: this._editableImage,
      });
      this.layer.addLayer(this._distortableImageLayer);
      // ugly hack
      try {
        this._distortableImageLayer._image.style.setProperty('z-index', this._editableImageZIndex);
        if (this._editableImage) this._distortableImageLayer.scaleBy(1);
      } catch (err) {
        //
      }
      this.layer.addEventListener('mouseup', this.mouseupCallback);
    } else {
      this._distortableImageSrc = undefined;
      this._distortableImageLayer = undefined;
      try {
        this.layer.removeEventListener('mouseup', this.mouseupCallback);
      } catch (err) {
        //
      }
    }
  }
  private mouseupCallback() {
    const corners = this._distortableImageLayer.getCorners().map(c => {
      if (c instanceof Array) return c;
      const { lat, lng } = c;
      return [lat, lng];
    });
    let diff = false;
    for (let index = 0; index < 4; index++) {
      if (
        corners?.[index]?.[0] !== this._corners?.[index]?.[0] ||
        corners?.[index]?.[1] !== this._corners?.[index]?.[1]
      ) {
        diff = true;
        break;
      }
    }
    if (diff) {
      this._corners = corners;
      this.onDistortImage?.(corners);
    }
  }
  get corners() {
    return this._corners;
  }
  set corners(value: [LatLng, LatLng, LatLng, LatLng]) {
    let diff = false;
    for (let index = 0; index < 4; index++) {
      if (
        value?.[index]?.[0] !== this._corners?.[index]?.[0] ||
        value?.[index]?.[1] !== this._corners?.[index]?.[1]
      ) {
        diff = true;
        break;
      }
    }
    if (diff) {
      this._corners = value;
      this._distortableImageLayer?.setCorners(
        value?.map(c => Leaflet.latLng(c?.[0], c?.[1])) ?? []
      );
    }
  }
  private _editableImage = true;
  get editableImage() {
    return this._editableImage;
  }
  set editableImage(value) {
    if (this._editableImage === value) return;
    this._editableImage = value;
    if (this._distortableImageLayer) {
      if (value) this._distortableImageLayer.enable?.();
      else this._distortableImageLayer.disable?.();
    }
  }

  private _editableImageZIndex = 300;
  get editableImageZIndex() {
    return this._editableImageZIndex;
  }
  set editableImageZIndex(value: number) {
    this._editableImageZIndex = value;
    try {
      if (this._distortableImageLayer?._image)
        this._distortableImageLayer._image.style.setProperty('z-index', value);
    } catch (err) {
      //
    }
  }
}

declare global {
  type LeafletDrawingOptions = Omit<Leaflet.Control.DrawConstructorOptions, 'edit'> & {
    edit: Omit<Leaflet.Control.EditOptions, 'featureGroup'>;
  };
  type LeafletEditableElementsChangeHandler = (editableLayers: FeatureGroup) => void;
}

export default MapContainer;
