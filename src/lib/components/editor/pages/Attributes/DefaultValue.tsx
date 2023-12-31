import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Attribute } from "../../types";

interface DefaultValueProps {
  id: string;
  name: string;
  form: Attribute;
  setForm: Dispatch<SetStateAction<Attribute>>;
}

export function DefaultValue({ id, name, form, setForm }: DefaultValueProps) {
  const handleTextValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      defaultValue: e.target.value,
    });
  };

  const handleNumericValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      defaultValue: e.currentTarget.valueAsNumber,
    });
  };

  const handleConditionValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      defaultValue: e.target.value === "true",
    });
  };
  switch (form.type) {
    case "TEXT":
      return (
        <input
          id={id}
          name={name}
          type="text"
          value={form.defaultValue.toString()}
          onChange={handleTextValueChange}
        />
      );
    case "NUMERIC":
      return (
        <input
          id={id}
          name={name}
          type="number"
          value={form.defaultValue.toString()}
          onChange={handleNumericValueChange}
        />
      );
    case "CONDITION":
      return (
        <select
          id={id}
          name={name}
          value={form.defaultValue.toString()}
          onChange={handleConditionValueChange}
        >
          <option value="">Choose an option</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
      );
  }
}
