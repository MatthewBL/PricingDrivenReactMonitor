import React from "react";
import { Outlet } from "react-router-dom";
import { EditorContextProvider } from "./context/EditorContextProvider";
import { NavBar } from "./components/NavBar";
import { PricingContext } from "./types";
import { AttributesProvider } from "./context/AttributesProvider";

interface PricingPlansEditorProps {
  pricingContext: PricingContext;
  returnTo: string;
  theme?: string;
  onSave: (pricingContext: PricingContext) => void;
}

export function PricingPlansEditor({
  theme,
  pricingContext,
  returnTo,
  onSave,
}: PricingPlansEditorProps) {
  return (
    <EditorContextProvider
      pricingContext={pricingContext}
      theme={theme}
      returnTo={returnTo}
    >
      <AttributesProvider>
        <header>
          <NavBar onSave={onSave} />
        </header>
        <Outlet />
      </AttributesProvider>
    </EditorContextProvider>
  );
}
