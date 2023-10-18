import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "../../components/Icons";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { PlanForm } from "./PlanForm";
import { Plan } from "../../types";
import { EditorContext } from "../../context/EditorContextProvider";
import "./Plans.css";

export function Plans() {
  const { plans, setPlans } = useContext(EditorContext);
  const [visible, setVisible] = useState(false);

  const addPlan = (newPlan: Plan) => {
    setPlans([...plans, newPlan]);
    setVisible(false);
  };

  const deletePlan = (name: string) => {
    setPlans(plans.filter((plan) => plan.name != name));
  };

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plans</h1>
        <Button
          className="pp-content-header__btn"
          onClick={() => setVisible(true)}
        >
          <Plus />
        </Button>
      </header>
      {plans.map((plan) => (
        <div key={plan.name} className="pp-plan-container">
          <Link className="pp-link" to={plan.name}>
            <PlanCard
              name={plan.name}
              description={plan.description}
              price={plan.price}
              currency={plan.currency}
            />
          </Link>
          <div className="pp-card-actions">
            <Button className="pp-btn" onClick={() => deletePlan(plan.name)}>
              Delete
            </Button>
            <Button className="pp-btn" onClick={() => console.log("Edit")}>
              Edit
            </Button>
          </div>
        </div>
      ))}
      <Modal open={visible}>
        <PlanForm onSubmit={addPlan} onCancel={() => setVisible(false)} />
      </Modal>
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
      <h2>{name.toUpperCase()}</h2>
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
