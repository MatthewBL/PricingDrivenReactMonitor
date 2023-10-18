import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Attributes, Plans, PricingContext } from "../types";
import { featuresToAttributes } from "../utils";

interface EditorContextProps {
  pricingContext: PricingContext;
  setPricingContext: Dispatch<SetStateAction<PricingContext>>;
  attributes: Attributes;
  setAttributes: Dispatch<SetStateAction<Attributes>>;
  plans: Plans;
  setPlans: Dispatch<SetStateAction<Plans>>;
  theme: string;
  returnTo: string;
}

export const EditorContext = createContext<EditorContextProps>({
  theme: "blue",
  returnTo: "/",
  pricingContext: {} as PricingContext,
  setPricingContext: () => null,
  attributes: [] as Attributes,
  setAttributes: () => null,
  plans: [] as Plans,
  setPlans: () => null,
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
  const features = pricingContext.features
    ? featuresToAttributes(pricingContext.features)
    : [];

  const initialPlans = pricingContext.plans ? pricingContext.plans : [];
  const [pricingState, setPricingState] = useState(pricingContext);
  const [attributes, setAttributes] = useState(features);
  const [plans, setPlans] = useState(initialPlans);
  return (
    <EditorContext.Provider
      value={{
        pricingContext: pricingState,
        setPricingContext: setPricingState,
        attributes,
        setAttributes,
        plans,
        setPlans,
        theme: editorTheme,
        returnTo: retTo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
