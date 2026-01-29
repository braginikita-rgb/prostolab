"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./ModalContext";
import { ContactForm } from "./ContactForm";
import { ContactLinks } from "./ContactLinks";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ContactModal() {
    const { isOpen, closeModal, view } = useModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeModal]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl pointer-events-auto relative"
                        >
                            {/* Close Button Wrapper */}
                            <div className="relative">

                                {isOpen && (
                                    view === 'links' ? <ContactLinks /> : <ContactForm />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
