import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AttributeType, Plan } from "../../types";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";
import { ArrowLeft } from "../../components/Icons";

export function Plan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { plans } = useContext(EditorContext);
  const isPlanIncluded = state.index !== null;

  const [plan, setPlan] = useState(
    isPlanIncluded
      ? plans[state.index]
      : { name: "", description: "", price: "", currency: "" }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("..");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPlan({ ...plan, [e.target.name]: e.target.value });

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <Button onClick={() => navigate("..")}>
          <ArrowLeft />
        </Button>
        <h1>{plan.name}</h1>
      </header>
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
        {}
        <Button className="pp-btn">Save</Button>
      </form>
    </article>
  );
}

function computeInputType(type: AttributeType) {
  switch (type) {
    case "CONDITION":
      return "checkbox";
    case "NUMERIC":
      return "number";
    case "TEXT":
      return "text";
  }
}
