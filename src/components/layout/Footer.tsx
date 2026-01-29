"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send, ArrowUpRight } from "lucide-react";
import { useModal } from "@/components/ui/ModalContext";

export function Footer() {
    const { openModal } = useModal();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        nav: [
            { label: "Как мы работаем", href: "#services" },
            { label: "Пакеты", href: "#packages" },
            { label: "Реклама", href: "#advertising" },
            { label: "ЧаВо", href: "#faq" },
        ],
        services: [
            { label: "Лендинг", href: "#" },
            { label: "Сайт компании", href: "#" },
            { label: "Контент для сайта", href: "#" },
            { label: "Логотип", href: "#" },
            { label: "Аналитика", href: "#" },
            { label: "Реклама", href: "#" },
            { label: "SEO (база)", href: "#" },
            { label: "Поддержка", href: "#" },
        ],
        documents: [
            { label: "Политика конфиденциальности", href: "/privacy" },
            { label: "Согласие на обработку ПДн", href: "/consent" },
            { label: "Cookies", href: "/cookies" },
        ]
    };

    return (
        <footer className="relative w-full pt-20 pb-10 mt-0 overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-black" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">





                {/* CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 px-6 py-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                            Готовы к запуску?
                        </h3>
                        <p className="text-slate-400">
                            Давайте обсудим ваш будущий проект прямо сейчас.
                        </p>
                    </div>

                    <button
                        onClick={() => openModal('links')}
                        className="relative z-10 m-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-2 group/btn whitespace-nowrap"
                    >
                        Связаться с нами
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </motion.div>

                {/* Main Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <Link href="/" className="block">
                            <h2 className="text-3xl font-bold tracking-tighter text-white">ProstoLab</h2>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-[280px]">
                            Запуск сайтов и маркетинга под ключ. Создаем цифровые продукты с характером.
                        </p>
                        <div className="flex gap-4">
                        </div>
                    </div>

                    {/* Navigation (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-semibold mb-6">Навигация</h4>
                        <ul className="space-y-3">
                            {footerLinks.nav.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-semibold mb-6">Услуги</h4>
                        <ul className="grid grid-cols-1 gap-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-purple-500 transition-colors" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacts (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h4 className="text-white font-semibold mb-6">Контакты</h4>
                            <ul className="space-y-4">
                                <li className="flex flex-col gap-1">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Telegram</span>
                                    <a href="https://t.me/prostolab_design" className="text-white hover:text-orange-400 transition-colors text-lg font-medium">
                                        @prostolab_design
                                    </a>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Email</span>
                                    <a href="mailto:contact@prostolab.org" className="text-white hover:text-purple-400 transition-colors text-lg font-medium">
                                        contact@prostolab.org
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Локация</span>
                                <span className="text-slate-300">Санкт-Петербург</span>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Время ответа</span>
                                <span className="text-slate-300">~ 24 часа</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <span>© {currentYear} ProstoLab. All systems nominal.</span>
                        <div className="flex gap-4">
                            {footerLinks.documents.map((link) => (
                                <Link key={link.label} href={link.href} className="hover:text-slate-300 transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="text-right">
                        <span>Сделано ProstoLab</span>
                    </div>
                </div>

                <div className="text-center mt-8 text-[10px] text-slate-700 max-w-2xl mx-auto">
                    Нажимая «Оставить заявку», вы соглашаетесь на обработку персональных данных.
                </div>
            </div>
        </footer>
    );
}
