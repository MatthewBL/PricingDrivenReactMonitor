import React from "react";
import { Route, Routes } from "react-router-dom";
import { PricingContext } from "./types";

interface PricingEditor {
  pricingContext: PricingContext;
  returnTo: string;
  themeColor: string;
  onSave: () => void;
}

export const PricingEditor = (props:PricingEditor) => {
  return (
    <Routes>
      <Route path={`hello`} element={<h1>Hello World</h1>} />
      <Route path={`hello1`} element={<h1>Hello World 1</h1>} />
    </Routes>
  );
};
