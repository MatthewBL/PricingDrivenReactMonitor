import { useContext } from "react";
import { Link } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import { Plus } from "../../components/Icons";
import "./Plans.css";

export function Plans() {
  const { plans } = useContext(EditorContext);

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plans</h1>
        <Link
          className="pp-content-header__btn"
          to="new"
          state={{ plan: null }}
        >
          <Plus />
        </Link>
      </header>
      <ul className="pp-plan-items">
        {plans.map((plan) => (
          <li key={plan.name}>
            <Link
              className="pp-plan-item pp-plan-card"
              to={plan.name}
              state={{ plan }}
            >
              <div>
                <h2>{plan.name}</h2>
                <h3>Description</h3>
                <p>{plan.description}</p>
                <h3>Price</h3>
                <span>{plan.price}</span> <span>{plan.currency}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
