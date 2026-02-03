"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useModal } from "@/components/ui/ModalContext";
import { Scene3Bg } from "./backgrounds/SceneBackgrounds";
import { SCENE_PREVIEW_OFFSETS } from "@/constants/scenePreviewOffsets";
import { SectionSeparator } from "../ui/SectionSeparator";
import { Layout, PenTool, FileText, Component, BarChart3, Megaphone, Search, LifeBuoy, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Идея",
        description: "Обсуждаем ваши цели и задачи"
    },
    {
        number: "02",
        title: "Дизайн",
        description: "Превью за 1 день"
    },
    {
        number: "03",
        title: "Разработка",
        description: "Создаём ваш продукт"
    },
    {
        number: "04",
        title: "Запуск",
        description: "Готово за неделю"
    }
];

const services = [
    { icon: Layout, label: "Лендинг / Веб-сайт" },
    { icon: PenTool, label: "UI/UX + Структура" },
    { icon: FileText, label: "Контент для сайта" },
    { icon: Component, label: "Логотип + Брендинг" },
    { icon: BarChart3, label: "Настройка аналитики" },
    { icon: Megaphone, label: "Настройка рекламы" },
    { icon: Search, label: "Базовое SEO" },
    { icon: LifeBuoy, label: "Поддержка после запуска" }
];

export function HowWeWorkSection() {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Rocket moves faster: traverse larger distance (-20% to 150%) in less scroll time (0 to 0.8)
    const rocketX = useTransform(scrollYProgress, [0, 0.8], ["-20%", "150%"]);
    const rocketMobileX = useTransform(scrollYProgress, [0, 0.4], ["-50%", "200%"]);
    // Constant Y position (flying straight)
    const rocketY = "20%"; // Flying above the content

    // Trail opacity fades as rocket moves
    const trailOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0, 0.8, 0.8, 0]);

    // Trail width must match rocketX but cannot be negative.
    // rocketX goes from -20% to 150% over [0, 0.8]. 
    // Zero crossing: -20 + (170/0.8)*p = 0 => p = 20 * 0.8 / 170 = 16/170 ~= 0.0941
    const trailWidth = useTransform(scrollYProgress, [0, 0.0941, 0.8], ["0%", "0%", "150%"]);

    // Mobile Trail:
    // Rocket starts at -50% (p=0). Reaches 0% at p=0.08. Ends at 200% at p=0.4.
    const trailMobileWidth = useTransform(scrollYProgress, [0, 0.08, 0.4], ["0%", "0%", "200%"]);
    const trailMobileOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 0.8, 0.8, 0]);

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative min-h-screen w-full pb-40 md:pb-80 pt-0 overflow-hidden z-20 bg-slate-50 mt-[-2px]"
        >
            {/* Light Background Pattern - Subtle Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Top Separator - Transition from Hero (Dark) */}
            {/* fill='#f8fafc' (White Corners) + bg-[#0a0a0a] (Black Middle) = Dark Bulge Down */}
            <SectionSeparator type="convex" fill="#f8fafc" className="top-0 z-30 pointer-events-none bg-[#0f0516]" />


            {/* Rocket Trail */}
            <motion.div
                className="absolute h-[3px] pointer-events-none z-10"
                style={{
                    left: 0,
                    top: isMobile ? "140px" : "20%", // Match rocket Y
                    translateY: "-50%", // Center vertically
                    width: isMobile ? trailMobileWidth : trailWidth, // Sync with rocket position
                    opacity: isMobile ? trailMobileOpacity : trailOpacity,
                    background: `linear-gradient(90deg, 
                        transparent 0%,
                        rgba(251, 146, 60, 0.2) 20%,
                        rgba(251, 146, 60, 0.6) 60%,
                        rgba(249, 115, 22, 0.8) 80%,
                        rgba(234, 88, 12, 1) 95%,
                        transparent 100%
                    )`,
                    filter: "blur(2px)",
                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)"
                }}
            />

            {/* Rocket */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    // Mobile: Align with title, fly fast across. Desktop: Use transforms.
                    left: isMobile ? rocketMobileX : rocketX,
                    right: undefined,
                    top: isMobile ? "140px" : rocketY, // Higher up (140px)
                    bottom: undefined,
                    rotate: 90, // Always point right for horizontal flight
                    translateX: "-50%",
                    translateY: "-50%",
                    filter: "drop-shadow(0 0 30px rgba(249, 115, 22, 0.6))",
                    width: isMobile ? "80px" : "120px",
                    height: isMobile ? "80px" : "120px",
                    opacity: isMobile ? 0.8 : 1,
                    zIndex: isMobile ? 20 : 5 // Above content on mobile
                }}
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/rocket.svg"
                        alt="Rocket"
                        fill
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-60">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-slate-900">
                        Как мы работаем
                    </h2>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium">
                        Прозрачный процесс от идеи до запуска
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <StepCard key={i} step={step} index={i} />
                    ))}
                </div>

                {/* Secondary Block: Services */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-40 mb-24"
                >
                    {/* Divider Line */}
                    <div className="w-full max-w-3xl h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 rounded-full mx-auto mb-24 shadow-[0_0_25px_rgba(249,115,22,0.6)]" />

                    <h3 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">
                        Что мы делаем для вашего запуска
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {services.map((service, i) => (
                            <ServiceCard key={i} service={service} index={i} />
                        ))}
                    </div>
                </motion.div>

                {/* CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative rounded-[40px] overflow-hidden bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10 text-center md:text-left">
                        <h4 className="text-2xl md:text-3xl font-bold mb-2">
                            Хотите план запуска под ваш проект?
                        </h4>
                        <p className="text-slate-400">
                            Рассчитаем сроки и стоимость за 24 часа
                        </p>
                    </div>

                    <button
                        onClick={() => openModal('form')}
                        className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-orange-50 transition-colors flex items-center gap-2 group"
                    >
                        Рассчитать стоимость
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Scene 3 Preview (About) */}
            <div
                className="scene-next-preview absolute left-0 right-0 bottom-0 z-10 pointer-events-none overflow-hidden"
                style={{
                    height: 'clamp(160px, 20vh, 240px)',
                    '--preview-offset': SCENE_PREVIEW_OFFSETS.HOW_WE_WORK_TO_ABOUT
                } as React.CSSProperties}
            >
                <div
                    className="scene-next-inner w-full h-[100vh] relative"
                    style={{ transform: 'translateY(calc(-1 * var(--preview-offset)))' }}
                >
                    <Scene3Bg className="absolute inset-0" mode="preview" />
                </div>
            </div>

            {/* Transition to Dark Mode (About Section) */}
            <SectionSeparator type="convex" fill="#f8fafc" className="bottom-[-1px] z-30 bg-[#0a0a0a] rotate-180" />
        </section>
    );
}

function StepCard({ step, index }: { step: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            style={{ opacity: 0 }}
            className="group relative bg-white/60 backdrop-blur-md p-8 rounded-[40px] flex flex-col items-start gap-4 hover:bg-white/80 transition-colors duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1),0_10px_40px_-15px_rgba(249,115,22,0.1)] md:hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05),0_20px_60px_-15px_rgba(249,115,22,0.3)] border border-slate-200 overflow-hidden"
        >
            {/* Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(249, 115, 22, 0.15),
                            rgba(139, 92, 246, 0.15),
                            transparent 80%
                        )
                    `
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-start gap-4">
                <div className="text-6xl font-black text-slate-200 absolute top-4 right-6 select-none group-hover:text-orange-500/80 transition-colors duration-500">
                    {step.number}
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-purple-100 border border-orange-200 flex items-center justify-center mb-2 shadow-inner">
                    <div className="w-3 h-3 rounded-full bg-orange-500 shadow-lg" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                    {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            style={{ opacity: 0 }}
            className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-[0_10px_30px_-5px_rgba(249,115,22,0.15)] md:hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-4 overflow-hidden"
        >
            {/* Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(249, 115, 22, 0.15),
                            rgba(139, 92, 246, 0.15),
                            transparent 80%
                        )
                    `
                }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                <div className="p-4 rounded-full bg-slate-50 border border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                    <service.icon className="w-8 h-8 text-slate-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-lg">
                    {service.label}
                </span>
            </div>
        </motion.div>
    );
}
