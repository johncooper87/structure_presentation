import { TileLayerOptions, CRS } from 'leaflet';

type Tile = TileLayerOptions & {
  name: string;
  url: string;
  crs?: CRS;
  vector?: boolean;
  format?: string;
};

const mapBoxAccessToken =
  'pk.eyJ1IjoiZ2Fza2FyaW50ZWdyYXRpb24iLCJhIjoiY2tuNGRlcHM2MW16bTJycXV2Z3FobWhsZCJ9.f_W9WOoimtuJ_jkU0TUdfQ';

const tiles: Tile[] = [
  {
    name: 'OpenStreet',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
  },
  {
    name: 'Google',
    url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 22,
  },
  {
    name: 'Яндекс',
    url: 'http://vec0{s}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&lang=ru_RU',
    subdomains: ['1', '2', '3', '4'],
    crs: CRS.EPSG3395,
    maxZoom: 21,
  },
  {
    name: '2GIS',
    url: 'http://tile{s}.maps.2gis.com/tiles?v=1&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
  },
  {
    name: 'Google спутник',
    url: 'https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: '0123',
  },
  {
    name: 'Google гибрид',
    url: 'http://mts{s}.google.com/vt/lyrs=y&x={x}&s=&y={y}&z={z}',
    subdomains: '0123',
  },
  {
    name: 'Яндекс cпутник',
    url: 'http://sat0{s}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}&lang=ru-RU',
    subdomains: ['1', '2', '3', '4'],
    crs: CRS.EPSG3395,
  },
  {
    name: 'Mapbox (векторная)',
    url: `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}{format}?access_token={accessToken}`,
    vector: true,
    // format: '.mvt',
    format: '.vector.pbf',
    subdomains: 'abcd',
    accessToken: mapBoxAccessToken,
    maxZoom: 20,
  },
];

export default tiles;
