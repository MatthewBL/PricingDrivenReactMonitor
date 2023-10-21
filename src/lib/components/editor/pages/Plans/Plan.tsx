import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AttributeType, Plan } from "../../types";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";
import { ArrowLeft } from "../../components/Icons";
import { computeType } from "../../utils";

interface PlanLocation {
  plan: Plan;
}

interface FeatureState {
  name: string;
  type: AttributeType;
  value: string | number | boolean;
}

export function Plan() {
  const location = useLocation();
  const state = location.state as PlanLocation;
  const navigate = useNavigate();
  const { attributes } = useContext(EditorContext);
  const isPlanIncluded = state.plan !== null;

  const emptyPlan = {
    name: "",
    description: "",
    price: 0,
    currency: "",
  };

  const defaultFeatures: FeatureState[] = attributes.map((attribute) => ({
    name: attribute.id,
    type: computeType(attribute.defaultValue),
    value: attribute.defaultValue,
  }));

  const existingFeatureValues: FeatureState[] = Object.entries(
    state.plan.features
  ).map(([attributeName, values]) => ({
    name: attributeName,
    type: computeType(values.value),
    value: values.value,
  }));

  const [plan, setPlan] = useState(isPlanIncluded ? state.plan : emptyPlan);
  const [features, setFeatures] = useState<FeatureState[]>(
    isPlanIncluded ? existingFeatureValues : defaultFeatures
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
        <FeatureList features={features} setFeatures={setFeatures} />
        <Button className="pp-btn">Save</Button>
      </form>
    </article>
  );
}

interface FeatureListProps {
  features: FeatureState[];
  setFeatures: Dispatch<SetStateAction<FeatureState[]>>;
}

function FeatureList({ features, setFeatures }: FeatureListProps) {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeatures(
      features.map((feature) => ({ ...feature, value: e.target.value }))
    );

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeatures(
      features.map((feature) => ({ ...feature, value: Number(e.target.value) }))
    );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setFeatures(
      features.map((feature) => ({ ...feature, value: e.target.checked }))
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
