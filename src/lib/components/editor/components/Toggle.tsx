import React from "react";

interface ToggleProps {
  isHidden: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ isHidden, onClick }: ToggleProps) {
  return (
    <button className="pp-toggle" type="button" onClick={onClick}>
      {isHidden ? ">" : "<"}
    </button>
  );
}
