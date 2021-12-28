import { Reducer } from 'redux';

interface SelectState {
  selectedKeyList: any[];
  selectedDataList: any[];
}

type SelectAction =
  | {
      type: 'TOGGLE_SELECTED';
      key: any;
      data: any;
      multiple?: boolean;
    }
  | {
      type: 'UPDATE_DATA';
      key: any;
      data: any;
    }
  | {
      type: 'DESELECT_ALL';
    };

export const initialState: SelectState = {
  selectedKeyList: [],
  selectedDataList: [],
};

const selectReducer: Reducer<SelectState, SelectAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SELECTED': {
      const { selectedKeyList, selectedDataList } = state;
      const { key, data, multiple } = action;

      const keyIndex = selectedKeyList.indexOf(key);
      if (keyIndex === -1)
        return {
          selectedKeyList: multiple ? [...selectedKeyList, key] : [key],
          selectedDataList: multiple ? [...selectedDataList, data] : [data],
        };
      return {
        selectedKeyList: multiple
          ? [...selectedKeyList.slice(0, keyIndex), ...selectedKeyList.slice(keyIndex + 1)]
          : [],
        selectedDataList: multiple
          ? [...selectedDataList.slice(0, keyIndex), ...selectedDataList.slice(keyIndex + 1)]
          : [],
      };
    }
    case 'UPDATE_DATA': {
      const { selectedKeyList, selectedDataList } = state;
      const { key, data } = action;

      const keyIndex = selectedKeyList.indexOf(key);
      return {
        selectedKeyList,
        selectedDataList: [
          ...selectedDataList.slice(0, keyIndex),
          data,
          ...selectedDataList.slice(keyIndex + 1),
        ],
      };
    }
    case 'DESELECT_ALL': {
      return {
        selectedKeyList: [],
        selectedDataList: [],
      };
    }
    default:
      return state;
  }
};

export default selectReducer;
