import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import { AttributeType, Features } from "../../types";
import { Button } from "../../components/Button";

export function Plan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(state.plan);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    state.addPlan();
    navigate("..");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPlan({ ...plan, [e.target.name]: e.target.value });

  return (
    <article className="pp-content__main">
      <h1>{plan?.toUpperCase()}</h1>
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
