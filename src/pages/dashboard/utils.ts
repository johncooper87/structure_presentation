import { Layouts } from 'react-grid-layout';
import widgets from './widgets';

export const allBreakpoints = ['xs', 'sm', 'md', 'lg'];

const allItemKeys = Object.keys(widgets);
const defaultLayouts = allItemKeys.reduce<ResonsiveGridDefaultLayouts>(
  (result, key) => ({ ...result, [key]: widgets[key].defaultLayouts }),
  {}
);
const sizeLimits = allItemKeys.reduce<ResonsiveGridSizeLimits>(
  (result, key) => ({ ...result, [key]: widgets[key].sizeLimits }),
  {}
);

export function getStoreLayouts(): ResonsiveGridLayouts {
  const storeItem = localStorage.getItem('dashboard/layouts');
  return storeItem === null ? { ...defaultLayouts } : JSON.parse(storeItem);
}
export function saveLayoutsToStore(layouts: ResonsiveGridLayouts) {
  localStorage.setItem('dashboard/layouts', JSON.stringify(layouts));
}

function getSize(size: number, minSize: number, maxSize: number) {
  if (size < minSize) return minSize;
  if (size > maxSize) return maxSize;
  return size ?? minSize;
}

function getResponsiveValue<T>(values: ResponsiveValues<T>, bp: string) {
  if (values !== undefined) {
    const value = values[bp];
    if (value !== undefined) return value;

    const bpIndex = allBreakpoints.indexOf(bp);

    for (let index = bpIndex - 1; index >= 0; index--) {
      const bp = allBreakpoints[index];
      const value = values[bp];
      if (value !== undefined) return value;
    }

    for (let index = bpIndex + 1; index < allBreakpoints.length; index++) {
      const bp = allBreakpoints[index];
      const value = values[bp];
      if (value !== undefined) return value;
    }
  }

  return {} as T;
}

export function convertToLayoutsProp(layouts: ResonsiveGridLayouts): Layouts {
  const layoutsProp: Layouts = {};
  const itemKeys = Object.keys(layouts);

  for (const itemKey of itemKeys) {
    const itemLayout = layouts[itemKey];
    const breakpoints = Object.keys(itemLayout).reverse();

    for (const bp of breakpoints) {
      const { left, top, width, height } = itemLayout[bp] || {};
      const defaultLayout = getResponsiveValue(defaultLayouts[itemKey], bp);
      const sizeLimit = getResponsiveValue(sizeLimits[itemKey], bp);
      const { minWidth, maxWidth, minHeight, maxHeight } = sizeLimit;

      if (layoutsProp[bp] === undefined) layoutsProp[bp] = [];
      layoutsProp[bp].push({
        i: itemKey,
        x: left || 0,
        y: top || 0,
        w: getSize(width ?? defaultLayout.width, minWidth, maxWidth),
        h: getSize(height ?? defaultLayout.height, minHeight, maxHeight),
        minW: minWidth,
        minH: minHeight,
        maxW: maxWidth,
        maxH: maxHeight,
      });
    }
  }

  return layoutsProp;
}

export function convertToLayoutsState(layouts: Layouts): Partial<ResonsiveGridLayouts> {
  const layoutsState: Partial<ResonsiveGridLayouts> = {};
  const breakpoints = Object.keys(layouts);

  for (const bp of breakpoints) {
    const breakpointLayouts = layouts[bp];

    for (const itemLayout of breakpointLayouts) {
      const { i: itemKey, x, y, w, h } = itemLayout;
      if (layoutsState[itemKey] === undefined) layoutsState[itemKey] = {};
      layoutsState[itemKey][bp] = {
        left: x,
        top: y,
        width: w,
        height: h,
      };
    }
  }

  return layoutsState;
}

export function getEndLayoutsState(itemKey: string, breakpoint: string) {
  const { width, height } = getResponsiveValue(defaultLayouts[itemKey], breakpoint);
  const { minWidth, minHeight } = getResponsiveValue(sizeLimits[itemKey], breakpoint);

  return {
    [breakpoint]: {
      left: 0,
      top: 0,
      width: width ?? minWidth,
      height: height ?? minHeight,
    },
  };
}
