import { create } from "zustand";

export interface ModalOptions {
  onAfterClose?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ModalContextType {
  modalContent: React.ReactNode;
  setModalContent: (modalContent: React.ReactNode) => void;
  options: ModalOptions;
  setOptions: (options: ModalOptions) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalContextType>((set) => ({
  modalContent: null,
  setModalContent: (modalContent) => set({ modalContent }),
  options: {},
  setOptions: (options) => set({ options }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
