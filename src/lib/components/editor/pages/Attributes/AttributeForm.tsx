import { ChangeEvent, FormEvent, useState } from "react";
import { Attribute, AttributeType } from "../../types";
import { DefaultValue } from "../../components/DefaultValue";
import { Button } from "../../components/Button";

interface AttributeFormProps {
  initialData: Attribute;
  onValidation: (name: string) => boolean;
  onSubmit: (attribute: Attribute) => void;
}

export function AttributeForm({
  initialData,
  onSubmit,
  onValidation,
}: AttributeFormProps) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({
    nameIsEmpty: "",
    defaultValueIsEmpty: "",
    duplicatedAttribute: "",
  });

  const nameIsEmpty = form.id === "" ? "Attribute name is required" : "";
  const defaultValueIsEmpty =
    form.defaultValue === "" ? "Attribute default value is required" : "";
  const hasNoErrors = Object.values(errors).every((error) => error === "");
  const duplicatedAttribute = onValidation(form.id)
    ? `Tried to add duplicated attribute '${form.id}'`
    : "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (hasNoErrors) {
      onSubmit(form);
    }

    console.log(errors);
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
      defaultValue: "",
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
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-form__group">
        <small>{errors.nameIsEmpty}</small>
        <small>{errors.duplicatedAttribute}</small>
        <label htmlFor="name" className="pp-form__label">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="pp-form__field"
          value={form.id}
          onChange={handleNameChange}
        />
      </div>
      <div className="pp-form__group">
        <label htmlFor="description" className="pp-form__label">
          Description
        </label>
        <input
          id="description"
          name="description"
          className="pp-form__field"
          value={form.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
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
      </div>

      <div>
        <small>{errors.defaultValueIsEmpty}</small>
        <label htmlFor="default">Default value</label>
        <DefaultValue
          id="default"
          name="default"
          type={form.type}
          onChange={handleDefaultValueChange}
          value={form.defaultValue.toString()}
        />
      </div>
      <Button
        className="pp-btn"
        onClick={() =>
          setErrors({ nameIsEmpty, defaultValueIsEmpty, duplicatedAttribute })
        }
      >
        Save
      </Button>
    </form>
  );
}
