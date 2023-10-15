import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Plans } from "../types";

interface PlansContextProps {
  plans: Plans;
  setPlans: Dispatch<SetStateAction<Plans>>;
}

export const PlansContext = createContext<PlansContextProps>({
  plans: [] as Plans,
  setPlans: () => null,
});

interface PlansContextProviderProps {
  initialPlans: Plans;
  children: JSX.Element | JSX.Element[];
}

export function PlansContextProvider({
  initialPlans,
  children,
}: PlansContextProviderProps) {
  const [plans, setPlans] = useState(initialPlans);
  return (
    <PlansContext.Provider
      value={{
        plans,
        setPlans,
      }}
    >
      {children}
    </PlansContext.Provider>
  );
}
