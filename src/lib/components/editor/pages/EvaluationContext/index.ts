export type Command = "edit" | "delete";

type Noop = "";
type Lower = "<";
type LowerEquals = "<=";
type Equals = "==";
type GreaterEquals = ">=";
type Greater = ">";
type Different = "!=";

export type Operators =
  | Noop
  | Lower
  | LowerEquals
  | Equals
  | GreaterEquals
  | Greater
  | Different;

export function computeEvaluation(
  leftOperand: string,
  operator: Operators,
  rightOperand: string
) {
  switch (operator) {
    case "":
      return "";
    case "<":
    case "<=":
    case "==":
    case ">=":
    case ">":
    case "!=":
      return leftOperand + ` ${operator} ` + rightOperand;
  }
}

export { EvaluationPage } from "./EvaluationPage";
