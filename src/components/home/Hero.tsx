"use client";

import { useRef } from "react";
import Link from "next/link";
import { useModal } from "../ui/ModalContext";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { TagCloud } from "./TagCloud";
import { SectionSeparator } from "../ui/SectionSeparator";

import { Scene1Bg, Scene2Bg } from "./backgrounds/SceneBackgrounds";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const { openModal } = useModal();

    const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full bg-transparent mb-[-2px]"
        >
            <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
                {/* Scene 1: Hero (Illustrated Earth Meadow/Sunrise) */}
                <Scene1Bg className="absolute inset-0 z-0" />

                {/* Tag Cloud (Constellation) - Z-10 */}
                <TagCloud scrollYProgress={scrollYProgress} />

                {/* Main title (Z-20) */}
                <motion.div
                    className="relative z-20 text-center px-6 mt-[-5vh]"
                    style={{
                        scale: titleScale,
                        opacity: titleOpacity,
                        y: titleY,
                    }}
                >
                    {/* Dual Glow Impact: Orange Left / Purple Right */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] max-w-[1000px] pointer-events-none -z-10 opacity-40 mix-blend-screen">
                        <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/20 blur-[100px] rounded-full" />
                        <div className="absolute top-1/2 right-[30%] translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full" />
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 relative">
                        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
                            ProstoLab
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        Digital production студия, создающая <br className="hidden md:block" /> премиальные веб-решения
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                        <button
                            onClick={() => openModal()}
                            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_4px_40px_rgba(249,115,22,0.4)]"
                        >
                            Рассчитать стоимость
                        </button>
                        <Link href="#packages" className="group relative px-10 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] flex items-center gap-2">
                            <span>Смотреть пакеты</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Navigation Hint - Simple Arrow */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-10 z-20 pointer-events-none"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-slate-500"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
