import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EditorContextProvider } from "./context/EditorContextProvider";
import { AttributesProvider } from "./context/AttributesProvider";
import { Toggle } from "./components/Toggle";
import { NavBar } from "./components/NavBar";
import { PricingContext } from "./types";
import "./PricingPlansEditor.css";
import { UserContextProvider } from "./context/UserContextProvider";

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
        <UserContextProvider>
          <div className="pp-editor">
            <NavBar hidden={hidden} />
            <main className="pp-content">
              <Toggle
                className="pp-toggle pp-content__toggle"
                isHidden={hidden}
                onClick={handleClick}
              />
              <Outlet />
            </main>
          </div>
        </UserContextProvider>
      </AttributesProvider>
    </EditorContextProvider>
  );
}
