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
        <div className="pp-form__group">
          <label htmlFor="name" className="pp-form__label">
            Plan name
          </label>
          <input
            id="name"
            name="name"
            className="pp-form__field"
            value={plan.name}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="description" className="pp-form__label">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="pp-form__field"
            value={plan.description}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="price" className="pp-form__label">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            className="pp-form__field"
            value={plan.price}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="currency" className="pp-form__label">
            Currency
          </label>
          <input
            id="currency"
            name="currency"
            className="pp-form__field"
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
