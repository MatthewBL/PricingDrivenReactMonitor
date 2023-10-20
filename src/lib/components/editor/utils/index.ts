import {
  Attribute,
  Attributes,
  Plan,
  Plans,
  RawFeatureAttributes,
  RawPlans,
} from "../types";

export function isNumeric(value: any) {
  return typeof value === "number";
}

export function isCondition(value: any) {
  return typeof value === "boolean" || value === "true" || value === "false";
}

export function isText(value: any) {
  return typeof value === "string";
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
      features: Object.entries(attributes.features).map(
        ([featureName, values]) => ({
          name: featureName,
          value: values.value,
        })
      ),
    };
    return plan;
  });
}
