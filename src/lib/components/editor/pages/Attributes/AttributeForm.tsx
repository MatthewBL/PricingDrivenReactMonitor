import { ChangeEvent, useState } from "react";
import { Attribute, AttributeType } from "../../types";
import { DefaultValue } from "../../components/DefaultValue";
import { Button } from "../../components/Button";
import { attributeFormToAttribute } from "../../utils";
import { AttributeFormData, AttributeFormErrors } from ".";

interface AttributeFormProps {
  initialData: AttributeFormData;
  onValidation: (attribute: Attribute) => AttributeFormErrors;
  onSubmit: (attribute: Attribute) => void;
}

export function AttributeForm({
  initialData,
  onSubmit,
  onValidation,
}: AttributeFormProps) {
  const [form, setForm] = useState(initialData);
  const errors = onValidation(form);

  const defaultValues = {
    TEXT: "", // Empty text
    NUMERIC: "0", // Cero
    CONDITION: "1", // True computed as 1
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorsExist = Object.keys(errors).length !== 0;
    console.log("Errors exists:", errorsExist);
    if (errorsExist) {
      console.log("[ERROR]", errors);
      return;
    }
    console.log(">>> Submited attribute:", form);

    const attribute = attributeFormToAttribute(form);
    onSubmit(attribute);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, id: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, description: e.target.value });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({
      ...form,
      type: e.target.value as AttributeType,
      defaultValue: defaultValues[e.target.value as AttributeType],
    });

  const handleDefaultValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      defaultValue: e.target.value,
    });
  };

  return (
    <form className="pp-attribute__form" onSubmit={handleSubmit}>
      {errors.emptyName && <small>{errors.emptyName}</small>}
      {errors.duplicateId && <small>{errors.duplicateId}</small>}
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={form.id}
        onChange={handleNameChange}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        value={form.description}
        onChange={handleDescriptionChange}
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
      {errors.emptyValue && <small>{errors.emptyValue}</small>}
      <label htmlFor="default">Default value</label>
      <DefaultValue
        id="default"
        name="default"
        type={form.type}
        onChange={handleDefaultValueChange}
        value={form.defaultValue}
      />
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
