"use client";

import Link from "next/link";
import { useModal } from "../ui/ModalContext";

export function Navbar() {
    const { openModal } = useModal();

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-7xl px-6">
                <nav className="pointer-events-auto w-full rounded-full border border-white/10 bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-between py-3 px-8 transition-all duration-500 hover:bg-black/30 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(249,115,22,0.1)]">
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
                        <Link href="#services" className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
                            Как мы работаем
                        </Link>
                        <Link href="#packages" className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
                            Пакеты
                        </Link>
                        <Link href="#advertising" className="text-sm font-medium text-slate-200 hover:text-white transition-colors drop-shadow-md">
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
                </nav>
            </div>
        </div>
    );
}
