import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Attributes, Plans, PricingContext, RawPricingContext } from "../types";
import { rawFeatureAttributesToAttributes, rawPlansToPlans } from "../utils";

interface EditorContextProps {
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
  attributes: [] as Attributes,
  setAttributes: () => null,
  plans: [] as Plans,
  setPlans: () => null,
});

interface EditorContextProviderProps {
  pricingContext: RawPricingContext;
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
    ? rawFeatureAttributesToAttributes(pricingContext.features)
    : [];

  const initialPlans = pricingContext.plans
    ? rawPlansToPlans(pricingContext.plans)
    : [];
  const [attributes, setAttributes] = useState(features);
  const [plans, setPlans] = useState(initialPlans);
  return (
    <EditorContext.Provider
      value={{
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
