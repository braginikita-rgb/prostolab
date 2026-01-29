"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ModalView = 'form' | 'links';

interface ModalContextType {
    isOpen: boolean;
    view: ModalView;
    openModal: (view?: ModalView) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<ModalView>('form');

    const openModal = (requestedView: ModalView = 'form') => {
        setView(requestedView);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{ isOpen, view, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
