import { ChangeEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import { AttributeType, Features } from "../../types";
import { Button } from "../../components/Button";

export function Plan() {
  const { plan } = useParams();
  const { pricingContext } = useContext(EditorContext);

  const [planFeatures, setPlanFeatures] = useState(
    planFeaturesInitializer(pricingContext.features)
  );

  const changeFeatureValue = (featureName: string, value: string) => {
    setPlanFeatures(
      planFeatures.map((feature) => {
        if (feature.featureName === featureName) {
          return { ...feature, value };
        } else {
          return feature;
        }
      })
    );
  };

  return (
    <article className="pp-content__main">
      <h1>{plan?.toUpperCase()}</h1>
      <form className="pp-form">
        {Object.entries(pricingContext.features).map(
          ([featureName, attributes], index) => (
            <div key={featureName} className="pp-field">
              <label>
                {featureName}
                <input
                  name={featureName}
                  type={computeInputType(attributes.type)}
                  value={planFeatures[index].value}
                  onChange={(e) =>
                    changeFeatureValue(featureName, e.target.value)
                  }
                ></input>
              </label>
            </div>
          )
        )}
        <Button className="pp-btn">Save</Button>
      </form>
    </article>
  );
}

function planFeaturesInitializer(features: Features) {
  return Object.entries(features).map(([featureName, attributes]) => ({
    featureName,
    value: attributes.defaultValue.toString(),
  }));
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
