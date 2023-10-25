import {
  Attribute,
  AttributeType,
  Attributes,
  Features,
  Plan,
  Plans,
  RawAttributes,
  RawFeatureAttributes,
  RawFeatures,
  RawPlan,
  RawPlans,
  RawPricingContext,
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

export function buildRawPricingContext(
  attributes: Attributes,
  plans: Plans
): RawPricingContext {
  return {
    features: attributesToRawAttributes(attributes),
    plans: plansToRawPlans(plans),
  };
}

function attributesToRawAttributes(
  attributes: Attributes
): RawFeatureAttributes {
  return Object.fromEntries(
    attributes.map((attribute) => {
      const rawAttributes: RawAttributes = {
        description: attribute.description,
        expression: attribute.expression,
        type: attribute.type,
        defaultValue: attribute.defaultValue,
      };
      return [attribute.id, rawAttributes];
    })
  );
}

function plansToRawPlans(plans: Plans): RawPlans {
  return Object.fromEntries(
    plans.map((plan) => {
      const rawPlan: RawPlan = {
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        features: featuresToRawFeatures(plan.features),
      };
      return [plan.name, rawPlan];
    })
  );
}

function featuresToRawFeatures(features: Features): RawFeatures {
  return Object.fromEntries(
    features.map((feature) => [feature.name, { value: feature.value }])
  );
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
