import { AttributeType } from "../types";

interface DefaultValueProps {
  id: string;
  name: string;
  type: AttributeType;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function DefaultValue({
  id,
  name,
  type,
  value,
  onChange,
}: DefaultValueProps) {
  switch (type) {
    case "TEXT":
      return (
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
      );
    case "NUMERIC":
      return (
        <input
          id={id}
          name={name}
          type="number"
          value={value}
          onChange={onChange}
        />
      );
    case "CONDITION":
      return (
        <select id={id} name={name} value={value} onChange={onChange}>
          <option value="">Choose an option</option>
          <option value="1">YES</option>
          <option value="0">NO</option>
        </select>
      );
  }
}
