"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene4Bg, Scene5Bg } from "./backgrounds/SceneBackgrounds";
import { SCENE_PREVIEW_OFFSETS } from "@/constants/scenePreviewOffsets";
import { SectionSeparator } from "../ui/SectionSeparator";
import { useModal } from "../ui/ModalContext";

interface Package {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    gradient: string;
}

const packages: Package[] = [
    {
        name: "Старт",
        price: "от 19 900 ₽",
        description: "Идеально для начинающих",
        features: [
            "Лендинг на 1 страницу",
            "Адаптивный дизайн",
            "Базовая SEO-оптимизация",
            "Срок: 7 дней"
        ],
        gradient: "from-orange-400 to-rose-400",
        popular: true
    },
    {
        name: "Бизнес",
        price: "от 49 900 ₽",
        description: "Для растущего бизнеса",
        features: [
            "Многостраничный сайт",
            "Уникальный дизайн",
            "Полная SEO-оптимизация",
            "CMS-система",
            "Срок: 14 дней"
        ],
        gradient: "from-rose-500 to-purple-500"
    },
    {
        name: "Премиум",
        price: "от 89 900 ₽",
        description: "Максимум возможностей",
        features: [
            "Многостраничный сайт",
            "CMS-система",
            "Брендинг и айдентика",
            "Продвинутая анимация",
            "Подключение API",
            "Поддержка 3 месяца",
            "Срок: 21 день"
        ],
        gradient: "from-purple-500 to-violet-600"
    }
];

export function PackagesSection() {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

    return (
        <section
            id="packages"
            ref={containerRef}
            className="relative z-30 min-h-screen w-full pt-24 md:pt-48 pb-32 md:pb-64 overflow-hidden bg-slate-50"
        >
            {/* Light Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Top Separator - Transition from About (Dark) */}
            <SectionSeparator type="convex" fill="#f8fafc" className="top-0 z-30 pointer-events-none bg-[#0a0a0a]" />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6"
                style={{ y }}
            >
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
                        Пакеты услуг
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                        Выберите оптимальное решение для вашего проекта
                    </p>
                </motion.div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-start">
                    {/* Start */}
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
                        className="p-8 rounded-[40px] flex flex-col h-full relative border-orange-500/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1),0_10px_40px_-15px_rgba(249,115,22,0.1)] bg-white transform scale-105 z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_-10px_rgba(249,115,22,0.4)] opacity-0"
                    >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg whitespace-nowrap z-20">
                            Популярный
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Старт</h3>
                        <div className="text-3xl font-bold text-slate-900 mb-4">
                            19 900 ₽
                        </div>
                        <p className="text-slate-500 mb-8 border-b border-slate-200 pb-8">Идеально для начинающих</p>
                        <ul className="space-y-4 mb-8 text-slate-700 text-sm">
                            {packages[0].features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-orange-500 mt-[2px]">•</span> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => openModal()}
                            className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mt-auto shadow-sm hover:shadow-orange-500/30"
                        >
                            Выбрать
                        </button>
                    </motion.div>

                    {/* Business (Popular) */}
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="bg-white/60 backdrop-blur-md p-8 rounded-[40px] flex flex-col h-full hover:bg-white transition-all duration-300 border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1),0_10px_40px_-15px_rgba(249,115,22,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05),0_20px_60px_-15px_rgba(249,115,22,0.3)] opacity-0"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Бизнес</h3>
                        <div className="text-3xl font-bold text-slate-900 mb-4">
                            49 900 ₽
                        </div>
                        <p className="text-slate-500 mb-8 border-b border-slate-100 pb-8">Для растущего бизнеса</p>
                        <ul className="space-y-4 mb-8 text-slate-700 text-sm font-medium">
                            {packages[1].features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-violet-600 mt-[2px]">•</span> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => openModal()}
                            className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mt-auto shadow-sm hover:shadow-orange-500/30"
                        >
                            Выбрать
                        </button>
                    </motion.div>

                    {/* Premium */}
                    <motion.div
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/60 backdrop-blur-md p-8 rounded-[40px] flex flex-col h-full hover:bg-white transition-all duration-300 border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1),0_10px_40px_-15px_rgba(249,115,22,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05),0_20px_60px_-15px_rgba(249,115,22,0.3)] opacity-0"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Премиум</h3>
                        <div className="text-3xl font-bold text-slate-900 mb-4">
                            89 900 ₽
                        </div>
                        <p className="text-slate-500 mb-8 border-b border-slate-200 pb-8">Максимум возможностей</p>
                        <ul className="space-y-4 mb-8 text-slate-700 text-sm">
                            {packages[2].features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-pink-500 mt-[2px]">•</span> {f}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => openModal()}
                            className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mt-auto shadow-sm hover:shadow-orange-500/30"
                        >
                            Выбрать
                        </button>
                    </motion.div>
                </div>

                {/* Additional Services */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-24 mb-10 text-center"
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
                        Дополнительные услуги
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {[
                            { name: "Логотип (базовый)", price: "3 900 ₽", desc: "Разработка логотипа для старта" },
                            { name: "Контент/тексты", price: "2 900 ₽", desc: "Написание текстов до 6 блоков" },
                            { name: "Настройка рекламы (старт)", price: "14 900 ₽", desc: "Базовая настройка (без гарантий KPI)" },
                            { name: "SEO-расширение", price: "12 900 ₽", desc: "Расширенная оптимизация и семантика" },
                            { name: "Поддержка/обновления", price: "4 900 ₽/мес", desc: "Первый месяц бесплатно" }
                        ].map((service, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2 gap-4">
                                    <h4 className="font-bold text-slate-900 text-lg">{service.name}</h4>
                                    <span className="font-bold text-orange-600 whitespace-nowrap">{service.price}</span>
                                </div>
                                <p className="text-slate-500 text-sm">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scene 5 Preview (Moon) */}
            <div
                className="scene-next-preview absolute left-0 right-0 bottom-0 z-10 pointer-events-none overflow-hidden"
                style={{
                    height: 'clamp(160px, 20vh, 240px)',
                    '--preview-offset': SCENE_PREVIEW_OFFSETS.PACKAGES_TO_MOON
                } as React.CSSProperties}
            >
                <div
                    className="scene-next-inner w-full h-[100vh] relative"
                    style={{ transform: 'translateY(calc(-1 * var(--preview-offset)))' }}
                >
                    <Scene5Bg className="absolute inset-0" mode="preview" />
                </div>
            </div>

            {/* Transition to Dark Mode (Moon Section) */}
            <SectionSeparator type="convex" fill="#f8fafc" className="bottom-[-1px] z-30 bg-[#0a0a0a] rotate-180" />
        </section>
    );
}
