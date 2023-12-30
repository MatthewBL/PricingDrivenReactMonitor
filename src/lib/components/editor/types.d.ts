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

export type Features = Feat[];

export interface Feat {
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

type Noop = "";
type Lower = "<";
type LowerEquals = "<=";
type Equals = "==";
type GreaterEquals = ">=";
type Greater = ">";
type Different = "!=";
type And = "&&";
type Or = "||";
type None = "None";

export type UserContextAttributes = UserContextAttribute[];

export interface UserContextAttribute {
  id: string;
  type: AttributeType;
}

export type Operators =
  | Noop
  | Lower
  | LowerEquals
  | Equals
  | GreaterEquals
  | Greater
  | Different
  | And
  | Or
  | None;

export type Tokens =
  | NoopToken
  | OperatorToken
  | UserContextToken
  | PlanContextToken
  | CustomValueToken
  | UnknownToken;

export type NoopToken = "Noop";
export type OperatorToken = "Operator";
export type UserContextToken = "UserContext";
export type PlanContextToken = "PlanContext";
export type CustomValueToken = "CustomValue";
export type UnknownToken = "Unknown";
export type ParsedToken = { type: Tokens; value: string };

export type Command = "add" | "edit" | "delete";

export interface Expression {
  operator: Operators;
  planContext: string;
  userContext?: string;
  customValue?: string;
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
