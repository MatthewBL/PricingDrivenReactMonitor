import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EditorContextProvider } from "./context/EditorContextProvider";
import { NavBar } from "./components/NavBar";
import { PricingContext } from "./types";
import { AttributesProvider } from "./context/AttributesProvider";
import { Toggle } from "./components/Toggle";

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
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <EditorContextProvider
      pricingContext={pricingContext}
      theme={theme}
      returnTo={returnTo}
    >
      <AttributesProvider>
        <div className="pp-editor">
          <NavBar hidden={hidden} />
          <main className="pp-content">
            <Toggle
              className="pp-toggle"
              isHidden={hidden}
              onClick={handleClick}
            />
            <Outlet />
          </main>
        </div>
      </AttributesProvider>
    </EditorContextProvider>
  );
}
