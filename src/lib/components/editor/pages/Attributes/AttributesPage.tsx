import { useContext, useState } from "react";
import { Attribute } from "../../types";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { AttributeForm } from "./AttributeForm";
import { AttributesContext } from "../../context/AttributesProvider";
import { AttributeFormErrors, Command, ERROR_MESSAGES } from ".";
import { Pencil, Plus, Trash } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import "./AttributesPage.css";

export function AttributesPage() {
  const { attributes, setAttributes } = useContext(EditorContext);
  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("add" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const handleClick = (action: Command) => {
    setCommand(action);
    openModal();
  };

  const addAttribute = (attribute: Attribute) => {
    setAttributes([...attributes, attribute]);
    closeModal();
  };

  const updateAttribute = (newAttribute: Attribute) => {
    console.log(newAttribute);
    closeModal();
  };

  const deleteAttribute = (name: string) =>
    setAttributes(attributes.filter((attribute) => attribute.id != name));

  const handleValidation = (attribute: Attribute) => {
    const errors: AttributeFormErrors = {};
    const { id, defaultValue } = attribute;
    const nameIsEmpty = id === "";
    const defaultValueIsEmpty = defaultValue === "";

    const attributeNameExistsWhenAddCommand =
      command === "add" &&
      attributes.filter((attribute) => attribute.id === id).length !== 0;

    const attributeNameExistsWhenEditCommand =
      command === "edit" &&
      attributes.filter(
        (attribute) => attribute.id !== attribute.id && attribute.id === id
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

  function ModalContent() {
    const emptyAttribute: Attribute = {
      id: "",
      description: "",
      type: "TEXT",
      defaultValue: "",
      expression: "",
    };

    switch (command) {
      case "add":
        return (
          <>
            <AttributeForm
              initialData={emptyAttribute}
              onSubmit={addAttribute}
              onValidation={handleValidation}
            />
            <Button className="pp-btn" onClick={closeModal}>
              Close
            </Button>
          </>
        );
      case "edit":
        return (
          <>
            <AttributeForm
              initialData={emptyAttribute}
              onSubmit={updateAttribute}
              onValidation={handleValidation}
            />
            <Button className="pp-btn" onClick={closeModal}>
              Close
            </Button>
          </>
        );
      case "delete":
        return (
          <>
            <h2>Do you want to delete this attribute?</h2>
            <Button className="pp-btn" onClick={closeModal}>
              NO
            </Button>
            <Button className="pp-btn" onClick={() => deleteAttribute("")}>
              YES
            </Button>
          </>
        );
    }
  }

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plan's attributes</h1>
        <Button
          className="pp-content-header__btn"
          onClick={() => handleClick("add")}
        >
          <Plus />
        </Button>
      </header>

      <Table
        className="pp-table"
        labels={["Name", "Type", "Default", "Actions"]}
      >
        <AttributeList />
      </Table>
      <Modal open={visible}>
        <ModalContent />
      </Modal>
    </article>
  );
}

function AttributeList() {
  const { attributes } = useContext(EditorContext);

  const displayDefaulValueText = (defaultValue: string | number | boolean) => {
    switch (typeof defaultValue) {
      case "string":
      case "number":
        return defaultValue;
      case "boolean": {
        return defaultValue ? "YES" : "NO";
      }
    }
  };

  return (
    <>
      {attributes.map((attribute) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td className={`pp-table-type__${attribute.type}`}>
            {attribute.type}
          </td>
          <td>{displayDefaulValueText(attribute.defaultValue)}</td>
          <td className="pp-table-actions">
            <Button onClick={() => console.log("Edit")}>
              <Pencil />
            </Button>

            <Button onClick={() => console.log("Delete")}>
              <Trash />
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
