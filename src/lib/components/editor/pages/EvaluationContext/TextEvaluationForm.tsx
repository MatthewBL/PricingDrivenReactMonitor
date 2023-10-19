import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "../../components/Button";
import { UserContext } from "../../context/UserContextProvider";
import { Operators, computeEvaluation } from "./index";
import { Attribute } from "../../types";

interface TextEvaluationFormProps {
  attribute: Attribute;
  onSubmit: (name: string, expression: string) => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function TextEvaluationForm({
  attribute,
  onSubmit,
  setVisible,
}: TextEvaluationFormProps) {
  const [form, setForm] = useState({
    operator: "",
    userContextValue: "",
    customValue: "",
  });
  const userContext = useContext(UserContext);
  const textAttributes = userContext.state.data.filter(
    (attribute) => attribute.type === "TEXT"
  );
  const [custom, setCustom] = useState(false);

  const handleToggleChange = () => {
    setCustom(!custom);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const leftOperand = `planContext['${attribute.id}']`;
    const rightOperand = custom
      ? `'${form.customValue}'`
      : `userContext['${form.userContextValue}']`;

    const expression = computeEvaluation(
      leftOperand,
      form.operator as Operators,
      rightOperand
    );
    onSubmit(attribute.id, expression);
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
          onChange={(e) => setForm({ ...form, operator: e.target.value })}
        >
          <option value="">DON'T EVALUATE</option>
          <option value="==">EQUALS</option>
          <option value="!=">DIFFERENT</option>
        </select>
      </div>
      <div className="pp-field">
        <label id="custom">Use custom value</label>
        <input
          id="custom"
          type="checkbox"
          checked={custom}
          onChange={handleToggleChange}
        />
      </div>
      <div className="pp-field">
        <label id="value-to-compare"></label>
        {!custom && (
          <select
            id="value-to-compare"
            name="value-to-compare"
            value={form.userContextValue}
            onChange={(e) =>
              setForm({ ...form, userContextValue: e.target.value })
            }
          >
            <option value="">Choose an option</option>
            {textAttributes.map((attribute) => (
              <option key={attribute.id} value={attribute.id}>
                {attribute.id}
              </option>
            ))}
          </select>
        )}
        {custom && (
          <input
            id="value-to-compare"
            name="value-to-compare"
            type="text"
            value={form.customValue}
            onChange={(e) => setForm({ ...form, customValue: e.target.value })}
          />
        )}
      </div>
      <Button
        type="button"
        className="pp-btn"
        onClick={() => setVisible(false)}
      >
        Close
      </Button>

      <Button className="pp-btn" onClick={() => setVisible(false)}>
        Save
      </Button>
    </form>
  );
}
