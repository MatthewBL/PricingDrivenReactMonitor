import { Button } from "../Button";
import { List, X } from "../Icons";
import "./Toggle.css";

interface ToggleProps {
  className: string;
  isHidden: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ className, isHidden, onClick }: ToggleProps) {
  return (
    <Button className={className} onClick={onClick}>
      {isHidden ? <List /> : <X />}
    </Button>
  );
}
