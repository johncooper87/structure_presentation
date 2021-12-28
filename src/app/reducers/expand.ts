import { Reducer } from 'redux';

interface ExpandState {
  expandList: Map<any, any>;
}

type ExpandAction = {
  type: 'TOOGLE_EXPANDED';
  name?: any;
  key: any;
};

export const initialState: ExpandState = {
  expandList: new Map(),
};

const expandReducer: Reducer<ExpandState, ExpandAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'TOOGLE_EXPANDED': {
      const { expandList } = state;
      const { name, key } = action;

      if (expandList.get(name) === key) expandList.set(name, null);
      else expandList.set(name, key);

      return state;
    }
    default:
      return state;
  }
};

export default expandReducer;
