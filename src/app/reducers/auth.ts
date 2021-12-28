import { Reducer } from 'redux';

declare global {
  interface AuthState {
    // allowedReports: any[];
    // attributes: Record<string, any>;
    // authDate: string;
    // dateCreate: string;
    // description: string;
    // displayName: string;
    // eMailIsConfirmed: boolean;
    // phoneIsConfirmed: boolean;
    // reportFilter: boolean;
    // userAccesses: any[];
    // userTimeShift: number;

    id: string;
    login: string;
    name: string;
    eMail: string;
    phone: string;
    role: {
      id: number;
      name: string;
      // displayName: string;
    };
    enterprise: {
      // displayName: string;
      id: string;
      name: string;
    };
  }
}

type AuthAction = { type: 'SIGNIN'; user: AuthState } | { type: 'SIGNOUT' };

const storeUser = localStorage.getItem('user');
export const initialState: AuthState = storeUser ? JSON.parse(storeUser) : null;

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN': {
      return action.user;
    }
    case 'SIGNOUT': {
      return null;
    }
    default:
      return state;
  }
};

export default authReducer;
