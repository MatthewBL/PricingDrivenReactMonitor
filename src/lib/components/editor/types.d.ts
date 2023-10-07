export interface PricingContext {
  features: Features;
  plans: Plans;
}

export interface Plans {
  [key: string]: Plan;
}

export interface Plan {
  description: string;
  price: number;
  currency: string;
  features: PlanValue;
}

export interface PlanValue {
  [key: string]: {
    value: string | number | boolean;
  };
}

export interface Features {
  [key: string]: Feature;
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
  description: string;
  type: AttributeType;
  defaultValue: string | number | boolean;
  expression: string;
}

export type AttributeType = "NUMERIC" | "CONDITION" | "TEXT";

export type Attributes = Attribute[];

export interface UserContextAttribute {
  id: string;
  type: AttributeType;
}
