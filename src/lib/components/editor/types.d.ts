export interface PricingContext {
  features: Features;
  plans: Plans;
}

export interface Plans {
  [key: string]: Plan;
}

export interface Features {
  [key: string]: Feature;
}

export interface Plan {
  description: string;
  price: number;
  currency: string;
  features: PlanValue;
}

export interface Feature {
  description: string;
  expression: string;
  serverExpression?: string;
  type: AttributeType;
  defaultValue: string | number | boolean;
}

export interface Attribute {
  id: string;
  type: AttributeType;
  description: string;
  defaultValue: string | number | boolean;
}

export type AttributeType = "NUMERIC" | "CONDITION" | "TEXT";

export type Attributes = Attribute[];

export interface PlanValue {
  [key: string]: {
    value: string | number | boolean;
  };
}
