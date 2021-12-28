import { Reducer } from 'redux';

declare global {
  interface PrintState {
    head: string[];
    body: (string | number)[][];
  }
}

type PrintAction = {
  type: 'SET_PRINT_DATA';
  head: string[];
  body: (string | number)[][];
};

export const initialState: PrintState = { head: [], body: [] };

const authReducer: Reducer<PrintState, PrintAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRINT_DATA': {
      const { head, body } = action;
      return { head, body };
    }
    default:
      return state;
  }
};

export default authReducer;
