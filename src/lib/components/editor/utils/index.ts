import {
  Attribute,
  AttributeType,
  Attributes,
  Expression,
  Features,
  Operators,
  ParsedToken,
  Plan,
  Plans,
  RawAttributes,
  RawFeatureAttributes,
  RawFeatures,
  RawPlan,
  RawPlans,
  RawPricingContext,
  UserContextAttributes,
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

export function parseAttributeExpressionToUserAttributes(
  attributes: Attributes
): UserContextAttributes {
  return attributes.map((attribute) => {
    const expression = parseExpression(attribute.expression);

    return { type: attribute.type, id: expression.userContext ?? "" };
  });
}

export function parseExpression(expression: string): Expression {
  const tokens = expression
    .trim()
    .split(" ")
    .map((token) => parseToken(token));

  let res: Expression = { operator: "", planContext: "" };

  tokens.map((token) => {
    switch (token.type) {
      case "PlanContext": {
        res.planContext = token.value;
        break;
      }
      case "UserContext": {
        res.userContext = token.value;
        break;
      }
      case "CustomValue": {
        res.customValue = token.value;
        break;
      }
      case "Operator":
        res.operator = token.value as Operators;
      case "Noop":
      case "Unknown":
        break;
    }
  });
  return res;
}

function parseToken(token: string): ParsedToken {
  const userContextRegex = /userContext\['(\w+)'\]/gm;
  const planContextRegex = /planContext\['(\w+)'\]/gm;
  const userContextMatch = Array.from(token.matchAll(userContextRegex));
  const planContextMatch = Array.from(token.matchAll(planContextRegex));

  if (token === "<") {
    return { type: "Operator", value: "<" };
  } else if (token === "<=") {
    return { type: "Operator", value: "<=" };
  } else if (token === "==") {
    return { type: "Operator", value: "==" };
  } else if (token === ">=") {
    return { type: "Operator", value: ">=" };
  } else if (token === ">") {
    return { type: "Operator", value: ">" };
  } else if (token === "!=") {
    return { type: "Operator", value: "!=" };
  } else if (token === "&&") {
    return { type: "Operator", value: "&&" };
  } else if (token === "||") {
    return { type: "Operator", value: "||" };
  } else if (token === "None") {
    return { type: "Operator", value: "None" };
  } else if (token === "") {
    return { type: "Noop", value: "" };
  } else if (userContextMatch.length === 0 && planContextMatch.length > 0) {
    return { type: "PlanContext", value: planContextMatch[0][1] };
  } else if (userContextMatch.length > 0 && planContextMatch.length === 0) {
    return { type: "UserContext", value: userContextMatch[0][1] };
  } else if (userContextMatch.length === 0 && planContextMatch.length === 0) {
    return { type: "CustomValue", value: token };
  } else {
    return { type: "Unknown", value: "" };
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
        expression: attributes.expression,
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
