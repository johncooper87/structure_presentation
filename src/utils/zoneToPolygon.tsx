const swapLngLat = ([lng, lat]: LngLat) => [lat, lng] as LatLng;

const notDeleted = (item: { deleted: boolean }) => !item.deleted;

const toHex = (num: number) => ('0' + num.toString(16)).slice(-2);

export const toColorArray = (color: string) => {
  const red = color.slice(1, 3);
  const green = color.slice(3, 5);
  const blue = color.slice(5, 7);
  const alpha = color.slice(7, 9) || 'ff';
  return [
    parseInt(red, 16),
    parseInt(green, 16),
    parseInt(blue, 16),
    parseInt(alpha, 16) / 255,
  ] as ZoneColor;
};

export function zoneToPolygon(zone: Zone, tooltip?: boolean, alpha?: number): Polygon {
  const {
    id,
    color: [red, green, blue, _alpha],
    name,
    states = [],
  } = zone;
  alpha = alpha ?? _alpha;
  return {
    id,
    // color: `rgba(${red},${green},${blue},${alpha})`,
    color: '#' + toHex(red) + toHex(green) + toHex(blue) + toHex(Math.floor(alpha * 255)),
    tooltip: tooltip ? name : undefined,
    latlngs: states.filter(notDeleted)[0]?.points?.map(swapLngLat) ?? [],
  };
}

export function zoneListToPolygonList(zones: Zone[], tooltip?: boolean, alpha?: number): Polygon[] {
  return zones.filter(notDeleted).map(zone => zoneToPolygon(zone, tooltip, alpha));
}
