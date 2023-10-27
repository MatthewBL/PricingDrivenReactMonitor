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
      return leftOperand + ` ${operator} ` + rightOperand;
  }
}

export { EvaluationPage } from "./EvaluationPage";
