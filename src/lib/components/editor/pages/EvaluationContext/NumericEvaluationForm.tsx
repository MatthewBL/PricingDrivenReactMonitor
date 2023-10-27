import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "../../components/Button";
import { UserContext } from "../../context/UserContextProvider";
import { computeEvaluation } from "./index";
import { Attribute, Operators } from "../../types";
import { parseExpression } from "../../utils";

interface NumericEvaluationFormProps {
  attribute: Attribute;
  onSubmit: (name: string, expression: string) => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function NumericEvaluationForm({
  attribute,
  onSubmit,
  setVisible,
}: NumericEvaluationFormProps) {
  const userContext = useContext(UserContext);
  const expression = parseExpression(attribute.expression);
  const numericAttributes = userContext.state.data.filter(
    (attribute) => attribute.type == "NUMERIC"
  );

  const [form, setForm] = useState({
    operator: expression.operator,
    valueToCompare: expression.userContext,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const leftOperand = `planContext['${attribute.id}']`;
    const rightOperand = `userContext['${form.valueToCompare}']`;

    const expression = computeEvaluation(
      leftOperand,
      form.operator as Operators,
      rightOperand
    );
    onSubmit(attribute.id, expression);
    setVisible(false);
  };

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-field">
        <label id="name">Name</label>
        <input id="name" value={attribute.id} readOnly />
      </div>
      <div>
        <label id="operator">Operator</label>
        <select
          id="operator"
          value={form.operator}
          onChange={(e) =>
            setForm({ ...form, operator: e.target.value as Operators })
          }
        >
          <option value="">DON'T EVALUATE</option>
          <option value="<">LOWER</option>
          <option value="<=">LOWER EQUALS</option>
          <option value="==">EQUALS</option>
          <option value=">=">GREATER EQUALS</option>
          <option value=">">GREATER</option>
          <option value="!=">DIFFERENT</option>
        </select>
      </div>
      <div className="pp-field">
        <label id="value-to-compare"></label>
        <select
          id="value-to-compare"
          name="value-to-compare"
          value={form.valueToCompare}
          onChange={(e) => setForm({ ...form, valueToCompare: e.target.value })}
        >
          <option value="">Choose an option</option>
          {numericAttributes.map((attribute) => (
            <option key={attribute.id} value={attribute.id}>
              {attribute.id}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        className="pp-btn"
        onClick={() => setVisible(false)}
      >
        Close
      </Button>

      <Button className="pp-btn">Save</Button>
    </form>
  );
}
