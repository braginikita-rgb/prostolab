"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../ui/ModalContext";

export function Navbar() {
    const { openModal } = useModal();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLightSection, setIsLightSection] = useState(false);

    const getHref = (hash: string) => pathname === "/" ? hash : `/${hash}`;

    useEffect(() => {
        const checkSection = () => {
            const sections = ['services', 'packages', 'advertising', 'faq'];
            const navHeight = 150; // Check point safely below navbar

            for (const id of sections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section contains the check point
                    if (rect.top <= navHeight && rect.bottom >= navHeight) {
                        const isLight = id === 'services' || id === 'packages' || id === 'faq';
                        setIsLightSection(isLight);
                        return;
                    }
                }
            }

            // Default to dark (false) if no specific section matched (e.g. Hero)
            setIsLightSection(false);
        };

        window.addEventListener('scroll', checkSection);
        checkSection(); // Initial check
        return () => window.removeEventListener('scroll', checkSection);
    }, []);

    // Close menu on scroll
    useEffect(() => {
        if (isMobileMenuOpen) {
            const handleScroll = () => setIsMobileMenuOpen(false);
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    const menuVariants = {
        closed: {
            scale: 0.9,
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        open: {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.4,
                delayChildren: 0.1,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
            <div className="relative w-full max-w-7xl px-6">
                <nav className="relative z-50 pointer-events-auto w-full rounded-full border border-white/10 bg-transparent backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-between py-3 px-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(249,115,22,0.1)]">
                    {/* ProstoLab Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tighter text-white drop-shadow-lg"
                        aria-label="ProstoLab Home"
                    >
                        ProstoLab
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href={getHref("#services")} className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
                            Как мы работаем
                        </Link>
                        <Link href={getHref("#packages")} className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
                            Пакеты
                        </Link>
                        <Link href={getHref("#advertising")} className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
                            Реклама
                        </Link>

                        {/* CTA Button */}
                        <button
                            onClick={() => openModal()}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/20"
                        >
                            Оставить заявку
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-orange-500 hover:text-orange-400 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className={`absolute top-0 right-6 w-48 p-2 
                            ${isLightSection
                                ? "bg-black/90 backdrop-blur-xl"
                                : "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.25)_100%)] backdrop-blur-xl"
                            } 
                            border border-white/10 rounded-[35px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-40 pointer-events-auto md:hidden overflow-hidden origin-top-right transition-colors duration-300`}
                    >
                        {/* Inner Gradient Glow */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={closeMenu}
                            className="absolute top-1 right-1 p-4 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 z-20"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative flex flex-col gap-1 p-2 pt-14">
                            <motion.div variants={itemVariants}>
                                <Link
                                    href={getHref("#services")}
                                    onClick={closeMenu}
                                    className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Как мы работаем
                                </Link>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href={getHref("#packages")}
                                    onClick={closeMenu}
                                    className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Пакеты
                                </Link>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href={getHref("#advertising")}
                                    onClick={closeMenu}
                                    className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Реклама
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="h-[1px] bg-white/10 my-1 mx-2" />

                            <motion.div variants={itemVariants}>
                                <button
                                    onClick={() => {
                                        openModal();
                                        closeMenu();
                                    }}
                                    className="w-full mt-0 px-3 py-2 rounded-xl text-xs font-bold text-black bg-white hover:bg-orange-50 transition-colors shadow-lg text-center"
                                >
                                    Оставить заявку
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
