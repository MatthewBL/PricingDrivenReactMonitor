import { useState } from "react";
import { AttributeType, UserContextAttribute } from "../../types";
import { Button } from "../../components/Button";
import { UserContextFormErrors } from "./index";

interface UserContextFormProps {
  initialData: UserContextAttribute;
  onValidation: (attribute: UserContextAttribute) => UserContextFormErrors;
  onSubmit: (attribute: UserContextAttribute) => void;
}

export function UserContextForm({
  initialData,
  onSubmit,
  onValidation,
}: UserContextFormProps) {
  const [form, setForm] = useState(initialData);
  const errors = onValidation(form);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorsExist = Object.keys(errors).length !== 0;
    console.log("Errors exists:", errorsExist);
    if (errorsExist) {
      console.log("[ERROR]", errors);
      return;
    }
    console.log(">>> Submited attribute:", form);

    onSubmit(form);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, id: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({
      ...form,
      type: e.target.value as AttributeType,
    });

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      {errors.emptyName && <small>{errors.emptyName}</small>}
      {errors.duplicateId && <small>{errors.duplicateId}</small>}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={form.id}
        onChange={handleNameChange}
      />
      <label htmlFor="type">Type</label>
      <select
        id="type"
        name="type"
        value={form.type}
        onChange={handleTypeChange}
      >
        <option value="NUMERIC">NUMERIC</option>
        <option value="TEXT">TEXT</option>
        <option value="CONDITION">CONDITION</option>
      </select>
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
