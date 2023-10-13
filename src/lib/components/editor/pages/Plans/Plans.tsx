import { useContext } from "react";
import { PlansContext } from "../../context/PlansContext";
import { Link } from "react-router-dom";

export function Plans() {
  const { plans } = useContext(PlansContext);

  return (
    <article className="pp-content__main">
      <h1>Plans</h1>
      {Object.keys(plans).map((planKey) => (
        <Link key={planKey} className="pp-link" to={planKey.toLowerCase()}>
          <PlanCard
            name={planKey}
            description={plans[planKey].description}
            price={plans[planKey].price}
            currency={plans[planKey].currency}
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
    <div style={{ backgroundColor: "white", marginBottom: "5px" }}>
      <h2>{name.toUpperCase()}</h2>
      <p>{description}</p>
      <p>
        Price: {price} {currency}
      </p>
    </div>
  );
}
