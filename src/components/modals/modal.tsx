"use client";
import { useModal } from "@/hooks/useModal";
import { useModalStore } from "@/stores/ModalContext";

export function Modal() {
  const { isOpen } = useModal();

  const content = useModalStore(({ modalContent }) => modalContent);

  if (!isOpen) return null;

  return content;
}
