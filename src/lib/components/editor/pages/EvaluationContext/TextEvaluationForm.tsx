import { FormEvent, useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Operators, computeEvaluation } from "./index";
import { AttributesContext } from "../../context/AttributesProvider";
import { UserContext } from "../../context/UserContextProvider";

export function TextEvaluationForm() {
  const { attributesState, dispatch } = useContext(AttributesContext);
  const attribute = attributesState.data[attributesState.index];
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

    const evaluation = computeEvaluation(
      leftOperand,
      form.operator as Operators,
      rightOperand
    );
    dispatch({
      type: "update_item",
      payload: { ...attribute, expression: evaluation },
    });
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
      <Button className="pp-btn">Save</Button>
      <div>
        <p>{JSON.stringify(form, null, 2)}</p>
      </div>
    </form>
  );
}
