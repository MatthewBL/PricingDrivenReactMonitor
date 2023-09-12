import React from "react";
import { Route } from "react-router-dom";
import { PricingContext } from "./types";

interface PricingEditor {
  pricingContext: PricingContext;
  returnTo: string;
  themeColor: string;
  onSave: () => void;
}

export const PricingEditor = () => {
  return (
    <>
      <Route path="/hello" element={<h1>Hello World</h1>} />
      <Route path="/hello1" element={<h1>Hello World 1</h1>} />
    </>
  );
};
