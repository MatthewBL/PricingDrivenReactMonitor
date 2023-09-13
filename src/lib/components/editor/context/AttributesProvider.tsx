import React, { Dispatch, createContext, useContext, useReducer } from "react";
import { featuresToAttributesState } from "../utils";

import { EditorContext } from "./EditorContextProvider";
import { Action, TableState, tableReducer } from "../reducers/tableReducer";
import { Attribute } from "../types";

interface AttributesContextProps {
  state: TableState<Attribute>;
  dispatch: Dispatch<Action<Attribute>>;
}

// --------------- TODO ----------------------------
// Reason well about default values when consuming context outside children
export const AttributesContext = createContext<AttributesContextProps>({
  state: { data: [], index: 0 },
  dispatch: () => null,
});

interface AttributesProviderProps {
  children: JSX.Element | Array<JSX.Element>;
}

export function AttributesProvider({ children }: AttributesProviderProps) {
  const { pricingContext } = useContext(EditorContext);

  const [state, dispatch] = useReducer(
    tableReducer<Attribute>,
    pricingContext.features,
    featuresToAttributesState
  );

  return (
    <AttributesContext.Provider value={{ state, dispatch }}>
      {children}
    </AttributesContext.Provider>
  );
}
