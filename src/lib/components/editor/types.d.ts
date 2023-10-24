export interface PricingContext {
  features: Features;
  plans: Plans;
}

export type Plans = Plan[];

export interface Plan {
  name: string;
  description: string;
  price: number;
  currency: string;
  features: Features;
}

export type Features = Feature[];

export interface Feature {
  name: string;
  type: AttributeType;
  value: string | number | boolean;
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

export interface RawPricingContext {
  features: RawFeatureAttributes;
  plans: RawPlans;
}

export interface RawFeatureAttributes {
  [key: string]: RawAttributes;
}

export interface RawAttributes {
  description: string;
  expression: string;
  serverExpression?: string;
  type: AttributeType;
  defaultValue: string | number | boolean;
}

export interface RawPlans {
  [key: string]: RawPlan;
}

export interface RawPlan {
  description: string;
  price: number;
  currency: string;
  features: RawFeatures;
}

export interface RawFeatures {
  [key: string]: {
    value: string | number | boolean;
  };
}
