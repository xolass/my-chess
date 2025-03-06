"use client";
import { useModal } from "@/hooks/useModal";
import { useModalStore } from "@/stores/ModalContext";

export function Modal() {
  const { isOpen, close, options } = useModal();

  const content = useModalStore(({ modalContent }) => modalContent);

  const { closeOnOverlayClick = true } = options;

  if (!isOpen) return null;

  return (
    <div
      className={"fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 bg-black/50"}
      onClick={closeOnOverlayClick ? close : undefined}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 transform transition-all duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4">{content}</div>
      </div>
    </div>
  );
}
