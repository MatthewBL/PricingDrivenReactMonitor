import {
  Attribute,
  AttributeType,
  Attributes,
  Features,
  Plan,
  Plans,
  RawFeatureAttributes,
  RawFeatures,
  RawPlans,
} from "../types";

export function computeType(value: any): AttributeType {
  switch (typeof value) {
    case "string":
      return "TEXT";
    case "number":
      return "NUMERIC";
    case "boolean":
      return "CONDITION";
    default:
      return "TEXT";
  }
}

export function rawFeatureAttributesToAttributes(
  rawFeatureAttributes: RawFeatureAttributes
): Attributes {
  return Object.entries(rawFeatureAttributes).map(
    ([attributeName, attributes]) => {
      const attribute: Attribute = {
        id: attributeName,
        description: attributes.description,
        expression: attributes.description,
        type: attributes.type,
        defaultValue: attributes.defaultValue,
      };
      return attribute;
    }
  );
}

export function rawPlansToPlans(rawPlans: RawPlans): Plans {
  return Object.entries(rawPlans).map(([planName, attributes]) => {
    const plan: Plan = {
      name: planName,
      description: attributes.description,
      price: attributes.price,
      currency: attributes.currency,
      features: rawFeaturesToFeatures(attributes.features),
    };
    return plan;
  });
}

function rawFeaturesToFeatures(features: RawFeatures): Features {
  return Object.entries(features).map(([featureName, attributes]) => ({
    name: featureName,
    type: computeType(attributes.value),
    value: attributes.value,
  }));
}
