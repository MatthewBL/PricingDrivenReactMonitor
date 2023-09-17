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

  const computeNavLinkStatus = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => {
    if (isPending) {
      return "pp-link--is-pending";
    } else {
      if (isActive) {
        return "pp-link--is-active";
      } else {
        return "pp-link";
      }
    }
  };

  return (
    <>
      <header>
        <div className="pp-brand">
          <img className="pp-brand__logo" />
          <h1 className="pp-brand__name">Pricingplans-react</h1>
        </div>
        <nav className="pp-nav" hidden={hidden}>
          <ul>
            <li>
              <NavLink className={computeNavLinkStatus} to="attributes">
                Attributes
              </NavLink>
            </li>
            <li>
              <NavLink className={computeNavLinkStatus} to="user-context">
                User Context
              </NavLink>
            </li>
            <li>
              <NavLink className={computeNavLinkStatus} to="plans">
                Pricing plans
              </NavLink>
            </li>
            <li>
              <NavLink className={computeNavLinkStatus} to="evaluation">
                Evaluation
              </NavLink>
            </li>
            <li>
              <NavLink className={computeNavLinkStatus} to={returnTo}>
                Return to page
              </NavLink>
            </li>
          </ul>
        </nav>
        <Button onClick={updatePricingContext} text="Save" />
        {/*<Button onClick={() => onSave(pricingContext)} text="Send" />*/}
      </header>
      <Toggle isHidden={hidden} onClick={handleClick} />
    </>
  );
}
