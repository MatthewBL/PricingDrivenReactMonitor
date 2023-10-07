import { AttributeFormData } from "../pages/Attributes";
import { TableState } from "../reducers/tableReducer";
import { Attribute, Attributes, Feature, Features } from "../types";

export function isNumeric(value: any) {
  return typeof value === "number";
}

export function isCondition(value: any) {
  return typeof value === "boolean" || value === "true" || value === "false";
}

export function isText(value: any) {
  return typeof value === "string";
}

export function featuresToAttributesState(
  features: Features
): TableState<Attribute> {
  return {
    index: 0,
    data: featuresToAttributes(features),
  };
}

function featuresToAttributes(features: Features): Attributes {
  return Object.entries(features).map(([id, feature]) => {
    return {
      id,
      description: feature.description,
      type: feature.type,
      defaultValue: feature.defaultValue,
      expression: feature.expression,
    };
  });
}

export function attributesToFeatures(attributes: Attributes): Features {
  const entries = attributes.map((attribute) => {
    const feature: Feature = {
      description: attribute.description,
      expression: "",
      type: attribute.type,
      defaultValue: attribute.defaultValue,
    };
    return [attribute.id, feature];
  });

  return Object.fromEntries(entries);
}

export function attributeToAttributeForm(
  attribute: Attribute
): AttributeFormData {
  let value: string;
  switch (attribute.type) {
    case "TEXT":
      value = attribute.defaultValue.toString();
      break;
    case "NUMERIC":
      value = attribute.defaultValue.toString();
      break;
    case "CONDITION":
      value = Number(attribute.defaultValue).toString();
      break;
  }
  return {
    id: attribute.id,
    description: attribute.description,
    type: attribute.type,
    defaultValue: value,
    expression: attribute.expression,
  };
}

export function attributeFormToAttribute(
  attributeForm: AttributeFormData
): Attribute {
  let value: string | boolean | number;
  switch (attributeForm.type) {
    case "TEXT":
      value = attributeForm.defaultValue.toString();
      break;
    case "NUMERIC":
      value = Number(attributeForm.defaultValue);
      break;
    case "CONDITION":
      value = Boolean(Number(attributeForm.defaultValue));
      break;
  }
  return {
    id: attributeForm.id,
    description: attributeForm.description,
    type: attributeForm.type,
    defaultValue: value,
    expression: attributeForm.expression,
  };
}
