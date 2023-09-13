import React from "react";
import { createPortal } from "react-dom";
import "../assets/Modal.css";

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
    <div className="modal-background">
      <div className="modal">{children}</div>
    </div>,
    portal
  );
}
