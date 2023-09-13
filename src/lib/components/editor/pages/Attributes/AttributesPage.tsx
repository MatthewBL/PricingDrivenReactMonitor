import React, { useContext, useState } from "react";
import { Attribute } from "../../types";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { AttributeForm } from "./AttributeForm";
import { AttributesContext } from "../../context/AttributesProvider";
import { attributeToAttributeForm } from "../../utils";
import { AttributeFormErrors, Command, ERROR_MESSAGES } from ".";

interface AttributePagesProps {
  title: string;
  tableHeaders: string[];
  addLabel: string;
}

export function AttributesPage({
  title,
  tableHeaders,
  addLabel,
}: AttributePagesProps) {
  const { state, dispatch } = useContext(AttributesContext);
  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("add" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const handleClick = (action: Command) => {
    setCommand(action);
    openModal();
  };

  const addAttribute = (attribute: Attribute) => {
    dispatch({ type: "add_item", payload: attribute });
    closeModal();
  };

  const updateAttribute = (newAttribute: Attribute) => {
    dispatch({ type: "update_item", payload: newAttribute });
    closeModal();
  };

  const deleteAttribute = () => {
    dispatch({ type: "delete_item" });
    closeModal();
  };

  const handleValidation = (attribute: Attribute) => {
    const errors: AttributeFormErrors = {};
    const { id, defaultValue } = attribute;
    const nameIsEmpty = id === "";
    const defaultValueIsEmpty = defaultValue === "";

    const attributeNameExistsWhenAddCommand =
      command === "add" &&
      state.data.filter((attribute) => attribute.id === id).length !== 0;

    const attributeNameExistsWhenEditCommand =
      command === "edit" &&
      state.data.filter(
        (attribute, index) => index !== state.index && attribute.id === id
      ).length !== 0;

    if (nameIsEmpty) {
      errors.emptyName = ERROR_MESSAGES.EMPTY_NAME;
    }

    if (defaultValueIsEmpty) {
      errors.emptyValue = ERROR_MESSAGES.EMPTY_VALUE;
    }

    if (
      attributeNameExistsWhenAddCommand ||
      attributeNameExistsWhenEditCommand
    ) {
      errors.duplicateId =
        ERROR_MESSAGES.DUPLICATE_ATTRIBUTE.PREFIX +
        `"${id}"` +
        ERROR_MESSAGES.DUPLICATE_ATTRIBUTE.SUFFIX;
    }
    return errors;
  };

  const computeModalContent = () => {
    switch (command) {
      case "add":
        return (
          <>
            <AttributeForm
              initialData={{
                id: "",
                description: "",
                type: "TEXT",
                defaultValue: "",
              }}
              onSubmit={addAttribute}
              onValidation={handleValidation}
            />
            <Button text="Close" onClick={closeModal} />
          </>
        );
      case "edit":
        return (
          <>
            <AttributeForm
              initialData={attributeToAttributeForm(state.data[state.index])}
              onSubmit={updateAttribute}
              onValidation={handleValidation}
            />
            <Button text="Close" onClick={closeModal} />
          </>
        );
      case "delete":
        return (
          <>
            <h2>Do you want to delete this attribute?</h2>
            <Button text="NO" onClick={closeModal} />
            <Button text="YES" onClick={deleteAttribute} />
          </>
        );
    }
  };

  const content = computeModalContent();

  return (
    <>
      <h1>{title}</h1>
      <Button onClick={() => handleClick("add")} text={addLabel} />

      <Table labels={tableHeaders}>
        <AttributeList onClick={handleClick} />
      </Table>
      <Modal open={visible}>{content}</Modal>
    </>
  );
}

interface AttributeListProps {
  onClick: (action: Command) => void;
}

function AttributeList({ onClick }: AttributeListProps) {
  const { state, dispatch } = useContext(AttributesContext);

  const renderAttributeItem = (attribute: Attribute) => {
    switch (typeof attribute.defaultValue) {
      case "string":
        return (
          <>
            <td className="text">{attribute.type}</td>
            <td>{attribute.defaultValue}</td>
          </>
        );
      case "number":
        return (
          <>
            <td className="numeric">{attribute.type}</td>
            <td>{attribute.defaultValue}</td>
          </>
        );
      case "boolean":
        return (
          <>
            <td className="condition">{attribute.type}</td>
            <td>{attribute.defaultValue ? "YES" : "NO"}</td>
          </>
        );
    }
  };

  return (
    <>
      {state.data.map((attribute, index) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          {renderAttributeItem(attribute)}
          <td>
            <Button
              onClick={() => {
                onClick("edit");
                dispatch({ type: "select_item", index });
              }}
              text="Edit"
            />
            <Button
              onClick={() => {
                onClick("delete");
                dispatch({ type: "select_item", index });
              }}
              text="Delete"
            />
          </td>
        </tr>
      ))}
    </>
  );
}
