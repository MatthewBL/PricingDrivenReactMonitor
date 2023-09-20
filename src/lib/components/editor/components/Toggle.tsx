import React from "react";

interface ToggleProps {
  className: string;
  isHidden: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ className, isHidden, onClick }: ToggleProps) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {isHidden ? ">" : "<"}
    </button>
  );
}
