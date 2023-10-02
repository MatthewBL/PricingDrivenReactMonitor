import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="pp-btn" {...props}>
      {children}
    </button>
  );
}
