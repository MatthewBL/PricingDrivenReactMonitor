import { useContext } from "react";
import { Link } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import "./Plans.css";
import { Plus } from "../../components/Icons";

export function Plans() {
  const { plans } = useContext(EditorContext);

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plans</h1>
        <Link className="pp-link" to="new" state={{ index: null }}>
          <Plus />
        </Link>
      </header>
      {plans.map((plan, index) => (
        <Link
          key={plan.name}
          className="pp-link"
          to={plan.name}
          state={{ index }}
        >
          <PlanCard
            name={plan.name}
            description={plan.description}
            price={plan.price}
            currency={plan.currency}
          />
        </Link>
      ))}
    </article>
  );
}

interface PlanCard {
  name: string;
  description: string;
  price: number;
  currency: string;
}

function PlanCard({ name, description, price, currency }: PlanCard) {
  return (
    <div className="pp-plan-card">
      <h2>{name}</h2>
      <p>
        <span>Description:</span>
        {description}
      </p>
      <p>
        Price: {price} {currency}
      </p>
    </div>
  );
}
