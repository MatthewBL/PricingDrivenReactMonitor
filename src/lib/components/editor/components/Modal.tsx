import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  children: JSX.Element | JSX.Element[];
}

export function Modal({ open, children }: ModalProps) {
  const portal = document.getElementById("portal") as HTMLElement;

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="pp-modal-background">
      <div className="pp-modal-content">{children}</div>
    </div>,
    portal
  );
}
