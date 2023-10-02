import { AttributeType } from "../../types";

export const ERROR_MESSAGES = {
  EMPTY_NAME:
    "You cannot add an attribute with an empty name. Choose the name wisely.",
  EMPTY_VALUE: "You have not provided any value to default value.",
  DUPLICATE_ATTRIBUTE: {
    PREFIX: "You already have an attribute with the name ",
    SUFFIX: " Please choose another name or edit the previous one.",
  },
} as const;

export type Command = "add" | "edit" | "delete";

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

export { AttributesPage } from "./AttributesPage";
