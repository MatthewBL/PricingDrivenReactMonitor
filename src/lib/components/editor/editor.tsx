import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PricingConfigurationRoutes } from ".";
import { PricingContext } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const pricingContext: PricingContext = {
  features: {
    maxGames: {
      description: "Max number of games to play",
      expression: "userContext['gamesPlayed'] < planContext['maxGames']",
      serverExpression: "userContext['gamesPlayed'] <= planContext['maxGames']",
      type: "NUMERIC",
      defaultValue: 0,
    },
    allowGameSpectators: {
      description: "Allow spectators in chess games",
      expression: "planContext['allowGameSpectators']",
      type: "CONDITION",
      defaultValue: false,
    },
  },
  plans: {
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
  },
};

const onSave = () => console.log("On save");

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
