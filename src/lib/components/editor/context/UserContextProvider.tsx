import { Dispatch, createContext, useReducer } from "react";

import { Action, TableState, tableReducer } from "../reducers/tableReducer";
import { UserContextAttribute } from "../types";

interface UserContextProps {
  state: TableState<UserContextAttribute>;
  dispatch: Dispatch<Action<UserContextAttribute>>;
}

// --------------- TODO ----------------------------
// Reason well about default values when consuming context outside children
export const UserContext = createContext<UserContextProps>({
  state: { data: [], index: 0 },
  dispatch: () => null,
});

interface UserContextProviderProps {
  children: JSX.Element | Array<JSX.Element>;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [state, dispatch] = useReducer(tableReducer<UserContextAttribute>, {
    data: [],
    index: 0,
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
