import React, {Dispatch, SetStateAction, createContext, useState} from "react";
import {PricingContext} from "../utils/types";

interface EditorContextProps {
  pricingContext: PricingContext;
  theme: string;
  returnTo: string;
  setPricingContext: Dispatch<SetStateAction<PricingContext>>;
}

export const EditorContext = createContext<EditorContextProps>({
  theme: "blue",
  returnTo: "/",
  pricingContext: {} as PricingContext,
  setPricingContext: () => null,
});

interface EditorContextProviderProps {
  pricingContext: PricingContext;
  theme?: string;
  returnTo?: string;
  children: JSX.Element | JSX.Element[];
}

export function EditorContextProvider({
  pricingContext,
  theme,
  returnTo,
  children,
}: EditorContextProviderProps) {
  const editorTheme = theme ? theme : "blue";
  const retTo = returnTo ? returnTo : "/";
  const [pricingState, setPricingState] = useState(pricingContext);
  return (
    <EditorContext.Provider
      value={{
        pricingContext: pricingState,
        setPricingContext: setPricingState,
        theme: editorTheme,
        returnTo: retTo,
      }}>
      {children}
    </EditorContext.Provider>
  );
}
