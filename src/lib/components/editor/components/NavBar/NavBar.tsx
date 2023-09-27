import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import { attributesToFeatures } from "../../utils";
import { AttributesContext } from "../../context/AttributesProvider";
import { Button } from "../Button";
import "./NavBar.css";

interface NavBarProps {
  hidden: boolean;
}

export function NavBar({ hidden }: NavBarProps) {
  const attrCtx = useContext(AttributesContext);
  const { theme, returnTo, pricingContext, setPricingContext } =
    useContext(EditorContext);

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
    <header>
      <nav className="pp-nav" hidden={hidden}>
        <img className="pp-logo" />
        <ul className="pp-nav-items">
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
        <Button onClick={updatePricingContext} text="Save" />
      </nav>
    </header>
  );
}
