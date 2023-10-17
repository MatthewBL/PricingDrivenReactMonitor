import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PricingConfigurationRoutes } from "./PricingConfigurationRoutes";
import { PricingContext } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const pricingContext: PricingContext = {
  features: {
    maxPets: {
      description: "Max pets limit per user in the clinic",
      expression: "planContext['maxPets'] > userContext['pets']",
      serverExpression: "planContext['maxPets'] >= userContext['pets']",
      type: "NUMERIC",
      defaultValue: 2,
    },
    maxVisitsPerMonthAndPet: {
      description: "Maximun number of visits per pets of an user",
      expression:
        "planContext['maxVisitsPerMonthAndPet'] > userContext['visitsPerMonth']",
      serverExpression:
        "planContext['maxVisitsPerMonthAndPet'] >= userContext['visitsPerMonth']",
      type: "NUMERIC",
      defaultValue: 5,
    },
    supportPriority: {
      description: "Technical priority support",
      expression: "planContext['supportPriority']",
      type: "TEXT",
      defaultValue: "LOW",
    },
    haveCalendar: {
      description:
        "User has a calendar to keep track of visits and appointments",
      expression: "planContext['haveCalendar']",
      type: "CONDITION",
      defaultValue: false,
    },
    havePetsDashboard: {
      description: "User has a dashboard to manage their pets",
      expression: "planContext['havePetsDashboard']",
      type: "CONDITION",
      defaultValue: false,
    },
  },
  plans: [
    {
      name: "BASIC",
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
    {
      name: "ADVANCED",
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
    {
      name: "PRO",
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
  ],
};

const onSave = (pricingContext: PricingContext) => console.log(pricingContext);

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
