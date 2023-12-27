import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Pencil, Trash } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import { Command } from "./index";
import { TextEvaluationForm } from "./TextEvaluationForm";
import { NumericEvaluationForm } from "./NumericEvaluationForm";
import "./EvaluationPage.css";
import { Attribute } from "../../types";
import { ConditionEvaluationForm } from "./ConditionEvaluationForm";

export function EvaluationPage() {
  const [visible, setVisible] = useState(false);
  const [command, setCommand] = useState("edit" as Command);

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Evaluation Configuration</h1>
      </header>

      <Table
        className="pp-table"
        labels={["Name", "Type", "Expression", "Actions"]}
      >
        <EvaluationList
          isModalVisible={visible}
          setVisible={setVisible}
          command={command}
          setCommand={setCommand}
        />
      </Table>
    </article>
  );
}

interface EvaluationListProps {
  isModalVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  command: Command;
  setCommand: Dispatch<SetStateAction<Command>>;
}

function EvaluationList({
  isModalVisible,
  setVisible,
  command,
  setCommand,
}: EvaluationListProps) {
  const { attributes, setAttributes } = useContext(EditorContext);
  const [position, setPosition] = useState(-1);

  const updateEvaluation = (name: string, expression: string) =>
    setAttributes(
      attributes.map((attribute) => {
        const updatedAttribute: Attribute = { ...attribute, expression };
        return attribute.id === name ? updatedAttribute : attribute;
      })
    );

  const deleteEvaluation = (name: string) => {
    setAttributes(
      attributes.map((attribute) =>
        attribute.id === name ? { ...attribute, expression: "" } : attribute
      )
    );
    setVisible(false);
  };

  return (
    <>
      {attributes.map((attribute, index) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td className={`pp-table-type__${attribute.type}`}>
            {attribute.type}
          </td>
          <td className="expression">
            {attribute.expression === "" ? "NOT EVALUATED" : "EVALUATED"}
          </td>
          <td className="pp-table-actions">
            <Button
              onClick={() => {
                setCommand("edit");
                setVisible(true);
                setPosition(index);
              }}
            >
              <Pencil />
            </Button>
            <Modal
              open={isModalVisible && command === "edit" && position === index}
            >
              <>
                {attribute.type === "TEXT" && (
                  <TextEvaluationForm
                    attribute={attribute}
                    onSubmit={updateEvaluation}
                    setVisible={setVisible}
                  />
                )}
                {attribute.type === "NUMERIC" && (
                  <NumericEvaluationForm
                    attribute={attribute}
                    onSubmit={updateEvaluation}
                    setVisible={setVisible}
                  />
                )}
                {attribute.type === "CONDITION" && (
                  <ConditionEvaluationForm
                    attribute={attribute}
                    onSubmit={updateEvaluation}
                    setVisible={setVisible}
                  />
                )}
              </>
            </Modal>

            <Button
              onClick={() => {
                setVisible(true);
                setCommand("delete");
                setPosition(index);
              }}
            >
              <Trash />
            </Button>
            <Modal
              open={
                isModalVisible && command === "delete" && position === index
              }
            >
              <h2>
                This action will stop evaluating {attribute.id}. Are you sure?
              </h2>
              <Button className="pp-btn" onClick={() => setVisible(false)}>
                NO
              </Button>
              <Button
                className="pp-btn"
                onClick={() => deleteEvaluation(attribute.id)}
              >
                YES
              </Button>
            </Modal>
          </td>
        </tr>
      ))}
    </>
  );
}
