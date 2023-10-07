import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Operators, computeEvaluation } from "./index";

export function TextEvaluationForm() {
  const [form, setForm] = useState({
    operator: "",
    userContextValue: "",
    customValue: "",
  });
  const [custom, setCustom] = useState(false);

  const handleToggleChange = () => {
    setCustom(!custom);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const leftOperand = `planContext['${"test"}']`;
    const rightOperand = custom
      ? `'${form.customValue}'`
      : `userContext['${form.userContextValue}']`;

    const evaluation = computeEvaluation(
      leftOperand,
      form.operator as Operators,
      rightOperand
    );

    console.log(evaluation);
  };

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-field">
        <label id="name">Name</label>
        <input id="name" value={"test"} readOnly />
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
            <option value="chat">chat</option>
            <option value="pets">pets</option>
            <option value="vets">vets</option>
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
      <Button className="pp-btn">Save</Button>
      <div>
        <p>{JSON.stringify(form, null, 2)}</p>
      </div>
    </form>
  );
}
