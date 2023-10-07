import { useState } from "react";
import { Button } from "../../components/Button";

export function NumericEvaluationForm() {
  const [form, setForm] = useState({ operator: "", valueToCompare: "" });

  return (
    <form>
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
          <option value="<">LOWER</option>
          <option value="<=">LOWER EQUALS</option>
          <option value="==">EQUALS</option>
          <option value=">=">GREATER EQUALS</option>
          <option value="<=">GREATER</option>
          <option value="!=">DIFFERENT</option>
        </select>
      </div>
      <div className="pp-field">
        <label id="value-to-compare"></label>
        <select
          id="value-to-compare"
          name="value-to-compare"
          value={form.valueToCompare}
          onChange={(e) => setForm({ ...form, operator: e.target.value })}
        >
          <option value="chat">chat</option>
          <option value="pets">pets</option>
          <option value="vets">vets</option>
        </select>
      </div>
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
