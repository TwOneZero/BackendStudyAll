import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { User } from '../types';

interface State {
  authenticated: boolean;
  user: User | undefined;
  loading: boolean;
}
interface Action {
  type: string;
  payload: any;
}

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  //로그인 상태에서 login,register 들어가면 메인으로 이동
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get('/auth/me');
        if (res) {
          dispatch('LOGIN', res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch('STOP_LOADING');
      }
    };
    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

/**
 * 다른 컴포넌트에서 사용할 수 있게 useContext 를 내보내기
 */
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
