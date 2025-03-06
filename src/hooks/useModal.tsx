"use client";
import { ModalOptions, useModalStore } from "@/stores/ModalContext";
import { useCallback, useEffect } from "react";

export function useModal(options: ModalOptions = {}) {
  const setOptions = useModalStore(({ setOptions }) => setOptions);
  const setIsOpen = useModalStore(({ setIsOpen }) => setIsOpen);
  const setModalContent = useModalStore(({ setModalContent }) => setModalContent);
  const isOpen = useModalStore(({ isOpen }) => isOpen);

  const { onAfterClose, closeOnEscape } = options;

  useEffect(() => {
    setOptions(options);
  }, [setOptions, options]);

  const open = useCallback(
    (children: React.ReactNode) => {
      setModalContent(children);
      setIsOpen(true);
    },
    [setIsOpen, setModalContent]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (onAfterClose) {
      // Use setTimeout to ensure the closing animation completes
      setTimeout(onAfterClose, 300);
    }
  }, [onAfterClose, setIsOpen]);

  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, closeOnEscape]);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return { open, close, isOpen, options };
}
