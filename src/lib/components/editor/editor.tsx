import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PricingConfigurationRoutes } from "./PricingConfigurationRoutes";
import { RawFeatureAttributes, RawPlans, RawPricingContext } from "./types";

const features: RawFeatureAttributes = {
  allowGameSpectators: {
    description: "Max games limit per user in the clinic",
    expression: "planContext['allowGameSpectators']",
    serverExpression: "planContext['maxPets'] >= userContext['pets']",
    type: "CONDITION",
    defaultValue: false,
  },
  maxGames: {
    description: "Maximun games",
    expression: "planContext['maxGames'] > userContext['games']",
    serverExpression:
      "planContext['maxVisitsPerMonthAndPet'] >= userContext['visitsPerMonth']",
    type: "NUMERIC",
    defaultValue: 5,
  },
};

const plans: RawPlans = {
  BASIC: {
    description: "Plan for basic users",
    price: 0,
    currency: "EUR",
    features: {
      maxGames: {
        value: 2,
      },
      allowGameSpectators: {
        value: false,
      },
    },
  },
  ADVANCED: {
    description: "Plan for advanced users",
    price: 9.99,
    currency: "EUR",
    features: {
      maxGames: {
        value: 25,
      },
      allowGameSpectators: {
        value: true,
      },
    },
  },
  PRO: {
    description: "Plan for pro users",
    price: 14.99,
    currency: "EUR",
    features: {
      maxGames: {
        value: 100,
      },
      allowGameSpectators: {
        value: true,
      },
    },
  },
};

const pricingContext: RawPricingContext = {
  features,
  plans,
};

const onSave = (pricingContext: RawPricingContext) =>
  console.log(pricingContext);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PricingConfigurationRoutes
        pricingContext={pricingContext}
        returnTo="/"
        onSave={onSave}
      />
    </BrowserRouter>
  </React.StrictMode>
);
