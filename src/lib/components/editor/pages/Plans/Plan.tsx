import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AttributeType, Plan } from "../../types";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";
import { ArrowLeft } from "../../components/Icons";
import { computeType } from "../../utils";

interface PlanLocation {
  index: number;
}

export function Plan() {
  const location = useLocation();
  const state = location.state as PlanLocation;
  const isPlanIncluded = state.index !== null;

  const navigate = useNavigate();

  const { plans } = useContext(EditorContext);

  const calculateInitialPlanState = (index: number | null) =>
    index !== null
      ? {
          name: plans[state.index].name,
          description: plans[state.index].description,
          price: plans[state.index].price,
          currency: plans[state.index].currency,
        }
      : {
          name: "",
          description: "",
          price: 0,
          currency: "",
        };

  const [plan, setPlan] = useState(calculateInitialPlanState(state.index));

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
        <h1>{isPlanIncluded ? plan.name : "New Plan"}</h1>
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
        <FeatureList planIndex={state.index} />
        <Button className="pp-btn">Save</Button>
      </form>
    </article>
  );
}

interface FeatureState {
  name: string;
  type: AttributeType;
  value: string | number | boolean;
}

interface FeatureListProps {
  planIndex: number;
}

function FeatureList({ planIndex }: FeatureListProps) {
  const { plans, attributes } = useContext(EditorContext);

  const computeInitialFeatures = (index: number | null) =>
    index !== null
      ? Object.entries(plans[planIndex].features).map(
          ([attributeName, values]) => ({
            name: attributeName,
            type: computeType(values.value),
            value: values.value,
          })
        )
      : attributes.map((attribute) => ({
          name: attribute.id,
          type: computeType(attribute.defaultValue),
          value: attribute.defaultValue,
        }));

  const [features, setFeatures] = useState<FeatureState[]>(
    computeInitialFeatures(planIndex)
  );

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeatures(
      features.map((feature) =>
        feature.name === e.target.name
          ? { ...feature, value: e.target.value }
          : feature
      )
    );

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeatures(
      features.map((feature) =>
        feature.name === e.target.name
          ? { ...feature, value: e.currentTarget.valueAsNumber }
          : feature
      )
    );
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setFeatures(
      features.map((feature) =>
        feature.name === e.target.name
          ? { ...feature, value: e.target.checked }
          : feature
      )
    );
  };

  return (
    <>
      {features.map((feature) => {
        switch (feature.type) {
          case "TEXT": {
            return (
              <div key={feature.name} className="pp-form__group">
                <label className="pp-form__label">{feature.name}</label>
                <input
                  className="pp-form__field"
                  type="text"
                  id={feature.name}
                  name={feature.name}
                  value={feature.value.toString()}
                  onChange={handleTextChange}
                />
              </div>
            );
          }
          case "NUMERIC": {
            return (
              <div key={feature.name} className="pp-form__group">
                <label className="pp-form__label">{feature.name}</label>
                <input
                  className="pp-form__field"
                  type="number"
                  id={feature.name}
                  name={feature.name}
                  value={feature.value.toString()}
                  onChange={handleNumberChange}
                />
              </div>
            );
          }
          case "CONDITION": {
            return (
              <div key={feature.name}>
                <label>{feature.name}</label>
                <input
                  type="checkbox"
                  id={feature.name}
                  name={feature.name}
                  checked={feature.value as boolean}
                  onChange={handleCheckboxChange}
                />
              </div>
            );
          }
        }
      })}
    </>
  );
}
