import { Reducer } from 'redux';
import { getEndLayoutsState, getStoreLayouts } from 'pages/dashboard/utils';
import widgets from 'pages/dashboard/widgets';

const allItemKeys = Object.keys(widgets);

interface DashboardState {
  layouts: ResonsiveGridLayouts;
  isLocked: boolean;
  selectedSiteId: string;
  currentBreakpoint?: string;
}

type DashboardAction =
  | { type: 'SET_LAYOUTS'; layouts: ResonsiveGridLayouts }
  | { type: 'TOGGLE_ITEM_DISPLAY_STATE'; itemKey: string | 'ALL' }
  | { type: 'TOGGLE_LOCKED_STATE' }
  | { type: 'SET_SELECTED_SITE_ID'; siteId: string };

export const initialState: DashboardState = {
  layouts: getStoreLayouts(),
  isLocked: localStorage.getItem('dashboard/is-locked') === 'true',
  selectedSiteId: localStorage.getItem('dashboard/selected-site-id'),
};

let removedLayouts: ResonsiveGridLayouts = {};

const dashboardReducer: Reducer<DashboardState, DashboardAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SET_LAYOUTS': {
      const { layouts } = action;
      return {
        ...state,
        layouts,
      };
    }

    case 'TOGGLE_ITEM_DISPLAY_STATE': {
      const { itemKey } = action;
      const { layouts, currentBreakpoint } = state;

      if (itemKey === 'ALL') {
        const itemKeys = Object.keys(layouts);

        if (itemKeys.length === allItemKeys.length) {
          removedLayouts = layouts;
          return {
            ...state,
            layouts: {},
          };
        }

        const _layouts = removedLayouts;
        removedLayouts = {};
        return {
          ...state,
          layouts: _layouts,
        };
      }

      const itemLayout = layouts[itemKey];
      if (itemLayout === undefined)
        return {
          ...state,
          layouts: {
            ...layouts,
            [itemKey]: removedLayouts[itemKey] || getEndLayoutsState(itemKey, currentBreakpoint),
          },
        };

      removedLayouts[itemKey] = itemLayout;
      const _layouts = { ...layouts };
      delete _layouts[itemKey];
      return {
        ...state,
        layouts: _layouts,
      };
    }

    case 'TOGGLE_LOCKED_STATE': {
      return {
        ...state,
        isLocked: !state.isLocked,
      };
    }

    case 'SET_SELECTED_SITE_ID': {
      const { siteId } = action;
      return {
        ...state,
        selectedSiteId: siteId,
      };
    }

    default:
      return state;
  }
};

export default dashboardReducer;
