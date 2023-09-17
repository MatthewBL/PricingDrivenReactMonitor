import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...props }: ButtonProps) {
  return (
    <button className="pp-btn" {...props}>
      {text}
    </button>
  );
}
