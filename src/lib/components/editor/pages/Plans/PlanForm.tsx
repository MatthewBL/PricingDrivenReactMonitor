import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Plan } from "../../types";

interface PlanFormProps {
  onSubmit: (plan: Plan) => void;
  onCancel: () => void;
}

export function PlanForm({ onSubmit, onCancel }: PlanFormProps) {
  const [plan, setPlan] = useState({
    name: "",
    description: "",
    price: "",
    currency: "",
    features: {},
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: plan.name,
      description: plan.description,
      price: Number(plan.price),
      currency: plan.currency,
      features: plan.features,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPlan({ ...plan, [e.target.name]: e.target.value });

  return (
    <>
      <h1>New plan</h1>
      <form className="pp-form" onSubmit={handleSubmit}>
        <div className="pp-field">
          <label htmlFor="name">Plan name</label>
          <input
            id="name"
            name="name"
            value={plan.name}
            onChange={handleChange}
          />
        </div>
        <div className="pp-field">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            value={plan.description}
            onChange={handleChange}
          />
        </div>
        <div className="pp-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={plan.price}
            onChange={handleChange}
          />
        </div>
        <div className="pp-field">
          <label htmlFor="currency">Currency</label>
          <input
            id="currency"
            name="currency"
            value={plan.currency}
            onChange={handleChange}
          />
        </div>
        <Button className="pp-btn" type="button" onClick={onCancel}>
          Close
        </Button>
        <Button className="pp-btn">Save</Button>
      </form>
    </>
  );
}
