export interface PricingEditor {
  pricingContext: PricingContext;
  returnTo: string;
  themeColor: string;
}

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

export const ActionsDict = {
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
} as const;

export interface AttributeFormErrors {
  emptyName?: string;
  emptyValue?: string;
  duplicateId?: string;
}

export interface AttributeFormData {
  id: string;
  description: string;
  type: AttributeType;
  defaultValue: string;
}

export const ERROR_MESSAGES = {
  EMPTY_NAME:
    "You cannot add an attribute with an empty name. Choose the name wisely.",
  EMPTY_VALUE: "You have not provided any value to default value.",
  DUPLICATE_ATTRIBUTE: {
    PREFIX: "You already have an attribute with the name ",
    SUFFIX: " Please choose another name or edit the previous one.",
  },
} as const;

export type Actions = "edit" | "add" | "delete";
