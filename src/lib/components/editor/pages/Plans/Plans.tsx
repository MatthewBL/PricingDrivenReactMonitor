import { useContext } from "react";
import { Link } from "react-router-dom";
import { Plan } from "../../types";
import { EditorContext } from "../../context/EditorContextProvider";
import "./Plans.css";

export function Plans() {
  const { plans, setPlans } = useContext(EditorContext);

  const addPlan = (newPlan: Plan) => {
    setPlans([...plans, newPlan]);
  };

  const deletePlan = (name: string) => {
    setPlans(plans.filter((plan) => plan.name != name));
  };

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plans</h1>
      </header>
      {plans.map((plan) => (
        <Link
          key={plan.name}
          className="pp-link"
          to={plan.name}
          state={{ plan, addPlan, deletePlan }}
        >
          <PlanCard
            name={plan.name}
            description={plan.description}
            price={plan.price}
            currency={plan.currency}
          />
        </Link>
      ))}
      <Link className="pp-link" to="new">
        Add plan
      </Link>
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
