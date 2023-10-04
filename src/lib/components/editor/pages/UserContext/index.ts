export const ERROR_MESSAGES = {
  EMPTY_NAME:
    "You cannot add an attribute with an empty name. Choose the name wisely.",
  DUPLICATE_ATTRIBUTE: {
    PREFIX: "You already have an attribute with the name ",
    SUFFIX: " Please choose another name or edit the previous one.",
  },
} as const;

export type Command = "add" | "edit" | "delete";

export interface UserContextFormErrors {
  emptyName?: string;
  emptyValue?: string;
  duplicateId?: string;
}

export { UserContextPage } from "./UserContextPage";
