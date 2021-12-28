import { Reducer } from 'redux';
import { getQueryParams } from 'utils';
import { getLayout } from 'hooks/useLayout';

interface LayoutState {
  leftbarOpen: boolean;
  rightbarOpen: boolean;
  menu: {
    key: string | null;
    anchorEl: Element | null;
    data: any | null;
  };
  dialog: {
    key: string | null;
    data: any | null;
  };
  topbarSearchExpanded: boolean;
}

type LayoutAction =
  | { type: 'CLOSE_LEFTBAR' }
  | { type: 'OPEN_LEFTBAR' }
  | { type: 'TOGGLE_LEFTBAR' }
  | { type: 'CLOSE_RIGHTBAR' }
  | { type: 'TOGGLE_RIGHTBAR' }
  | {
      type: 'OPEN_MENU';
      key: string;
      anchorEl: Element;
      data?: any;
    }
  | { type: 'CLOSE_MENU' }
  | {
      type: 'OPEN_DIALOG';
      key: string;
      data?: any;
    }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'EXPAND_TOPBAR_SEARCH' }
  | { type: 'COLLAPSE_TOPBAR_SEARCH' };

export const initialState: LayoutState = {
  leftbarOpen: JSON.parse(localStorage.getItem('leftbarOpen')) ?? getLayout(window.innerWidth) === 'desktop',
  rightbarOpen: JSON.parse(localStorage.getItem('rightbarOpen')) ?? getLayout(window.innerWidth) === 'desktop',
  menu: {
    key: null,
    anchorEl: null,
    data: null,
  },
  dialog: {
    key: null,
    data: null,
  },
  topbarSearchExpanded: Boolean(getQueryParams().search),
};

const layoutReducer: Reducer<LayoutState, LayoutAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_LEFTBAR': {
      return {
        ...state,
        leftbarOpen: false,
      };
    }
    case 'OPEN_LEFTBAR': {
      return {
        ...state,
        leftbarOpen: true,
      };
    }
    case 'TOGGLE_LEFTBAR': {
      return {
        ...state,
        leftbarOpen: !state.leftbarOpen,
      };
    }

    case 'CLOSE_RIGHTBAR': {
      return {
        ...state,
        rightbarOpen: false,
      };
    }
    case 'TOGGLE_RIGHTBAR': {
      return {
        ...state,
        rightbarOpen: !state.rightbarOpen,
      };
    }

    case 'OPEN_MENU': {
      const { key, anchorEl, data } = action;
      return {
        ...state,
        menu: { key, anchorEl, data },
      };
    }
    case 'CLOSE_MENU': {
      return {
        ...state,
        menu: {
          key: null,
          anchorEl: null,
          data: null,
        },
      };
    }

    case 'OPEN_DIALOG': {
      const { key, data } = action;
      return {
        ...state,
        dialog: { key, data },
      };
    }
    case 'CLOSE_DIALOG': {
      return {
        ...state,
        dialog: {
          key: null,
          data: null,
        },
      };
    }

    case 'EXPAND_TOPBAR_SEARCH': {
      return {
        ...state,
        topbarSearchExpanded: true,
      };
    }
    case 'COLLAPSE_TOPBAR_SEARCH': {
      return {
        ...state,
        topbarSearchExpanded: false,
      };
    }
    default:
      return state;
  }
};

export default layoutReducer;
