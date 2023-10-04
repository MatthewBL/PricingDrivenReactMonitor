import { Button } from "../../components/Button";

export function EvaluationForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="pp-attribute__form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={"test"} readOnly />
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
