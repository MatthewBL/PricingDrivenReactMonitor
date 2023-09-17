import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Toggle } from "../components/Toggle";
import { EditorContext } from "../context/EditorContextProvider";
import { Button } from "../components/Button";
import { attributesToFeatures } from "../utils";
import { AttributesContext } from "../context/AttributesProvider";
import { PricingContext } from "../types";

interface NavBarProps {
  onSave: (pricingContext: PricingContext) => void;
}

export function NavBar({ onSave }: NavBarProps) {
  const attrCtx = useContext(AttributesContext);
  const { theme, returnTo, pricingContext, setPricingContext } =
    useContext(EditorContext);
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    setHidden(!hidden);
  };

  const features = attributesToFeatures(attrCtx.state.data);

  const updatePricingContext = () => {
    setPricingContext({ ...pricingContext, features });
  };

  return (
    <>
      <nav className="pp-nav" hidden={hidden}>
        <ul>
          <li>
            <NavLink to="attributes">Attributes</NavLink>
          </li>
          <li>
            <NavLink to="user-context">User Context</NavLink>
          </li>
          <li>
            <NavLink to="plans">Pricing plans</NavLink>
          </li>
          <li>
            <NavLink to={returnTo}>Return to page</NavLink>
          </li>
        </ul>
      </nav>
      <Toggle isHidden={hidden} onClick={handleClick} />
      <Button onClick={updatePricingContext} text="Save" />
      <Button onClick={() => onSave(pricingContext)} text="Send" />
      <pre>{JSON.stringify(pricingContext, null, 2)}</pre>
    </>
  );
}
