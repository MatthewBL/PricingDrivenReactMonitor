import { Operators } from "../../types";

export type Command = "edit" | "delete";

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
    case "||":
    case "&&":
      return `${leftOperand} ${operator} ${rightOperand}`;
    case "None":
      return leftOperand;
  }
}

export { EvaluationPage } from "./EvaluationPage";
