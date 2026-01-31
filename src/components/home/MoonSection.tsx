"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene6Bg } from "./backgrounds/SceneBackgrounds";
import { SCENE_PREVIEW_OFFSETS } from "@/constants/scenePreviewOffsets";

import { useModal } from "@/components/ui/ModalContext";

export function MoonSection() {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Comet Trail Logic
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);

    useEffect(() => {
        // Performance: Disable trail on touch devices or small screens
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) return;

        let animationFrameId: number;
        let count = 0;

        const updateTrail = () => {
            setTrail(prev => {
                // If moving or existing points, update
                if (!isHovering.current) {
                    // Shrink trail if not hovering
                    if (prev.length > 0) return prev.slice(1);
                    return prev;
                }

                // Add new point at current mouse position
                // Fix: prevent adding points at (0,0) or off-screen to avoid artifacts
                if (mouseRef.current.x <= 0 || mouseRef.current.y <= 0) return prev;

                const newPoint = { x: mouseRef.current.x, y: mouseRef.current.y, id: count++ };
                const newTrail = [...prev, newPoint];
                if (newTrail.length > 20) newTrail.shift(); // Keep trail length limited
                return newTrail;
            });
            animationFrameId = requestAnimationFrame(updateTrail);
        };

        // Start animation loop
        updateTrail();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Only track if inside bounds
        if (x > 0 && y > 0 && x < rect.width && y < rect.height) {
            isHovering.current = true;
            mouseRef.current = { x, y };
        } else {
            isHovering.current = false;
        }
    };

    const handleMouseLeave = () => {
        isHovering.current = false;
    };

    return (
        <section
            id="advertising"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-40 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-none bg-[#0a0a0a] py-20"
        >

            {/* Scene 6 Preview (Crossfade Target) */}
            <div
                className="scene-next-preview absolute left-0 right-0 bottom-0 z-[-2] pointer-events-none overflow-hidden"
                style={{
                    height: 'clamp(160px, 20vh, 240px)',
                    '--preview-offset': '300px' // Shift scene UP to show only bottom part
                } as React.CSSProperties}
            >
                <div
                    className="scene-next-inner w-full h-[100vh] relative"
                    style={{ transform: 'translateY(calc(-1 * var(--preview-offset)))' }}
                >
                    <Scene6Bg className="absolute inset-0" mode="preview" />
                </div>
            </div>

            {/* Ambient Light Glows (Orange/Purple) - Increased Brightness */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] max-w-[1200px] pointer-events-none z-0 opacity-100 mix-blend-screen">
                <div className="absolute top-[40%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/30 blur-[100px] rounded-full" />
                <div className="absolute top-[60%] right-[20%] translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-[100px] rounded-full" />
            </div>

            {/* Comet Trail Effect */}
            {
                trail.map((point, index) => (
                    <div
                        key={point.id}
                        className="absolute rounded-full pointer-events-none z-30"
                        style={{
                            left: point.x,
                            top: point.y,
                            width: `${(index / trail.length) * 20}px`,
                            height: `${(index / trail.length) * 20}px`,
                            background: `rgba(6, 182, 212, ${index / trail.length})`, // Neon Blue (Cyan)
                            boxShadow: `0 0 ${index * 2}px rgba(6, 182, 212, 0.8)`, // Blue glow
                            transform: "translate(-50%, -50%)",
                            opacity: index / trail.length,
                        }}
                    />
                ))
            }

            {/* Content Container - Centered Grid */}
            <div className="relative z-20 w-full max-w-7xl px-6 grid grid-cols-1 place-items-center">

                {/* Moon Visual (Centered) */}
                <motion.div
                    style={{ scale }}
                    className="col-start-1 row-start-1 relative w-full max-w-6xl aspect-square z-0 flex items-center justify-center will-change-transform"
                >
                    <Image
                        src="/moon_fixed.png"
                        alt="Marketing Moon"
                        fill
                        className="object-contain drop-shadow-2xl opacity-90"
                        priority={false} // Deferred loading for performance
                        unoptimized
                        quality={90} // Slightly reduced quality for perf
                    />
                </motion.div>

                {/* Glass Offer Card (Centered Overlay) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="col-start-1 row-start-1 relative z-10 w-full glass-panel p-8 md:p-12 rounded-[40px] border-white/20 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                >
                    {/* Radial Shadow for Readability */}
                    <div className="absolute inset-0 bg-radial-gradient from-black/40 to-transparent rounded-[40px] pointer-events-none" />

                    <div className="relative z-10 text-center">
                        <div className="max-w-4xl mx-auto mb-10">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Рост трафика и заявок - через измеримый маркетинг
                            </h2>
                            <p className="text-white leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
                                Настроим аналитику, рекламу и посадочные так, чтобы вы видели цифры и понимали, что работает.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 text-left">
                            {/* Analytics */}
                            <div className="bg-black/60 p-5 lg:p-6 rounded-2xl border border-white/10 hover:bg-black/80 transition-colors group">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-3 text-xl transition-colors">
                                    <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" /> Аналитика
                                </h4>
                                <ul className="text-base text-white space-y-3 pl-4 border-l-2 border-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                                    <li>GA4 / Яндекс.Метрика</li>
                                    <li>События и цели (клики, формы)</li>
                                    <li>UTM + отчёты сквозной аналитики</li>
                                </ul>
                            </div>

                            {/* Ads */}
                            <div className="bg-black/60 p-5 lg:p-6 rounded-2xl border border-white/10 hover:bg-black/80 transition-colors group">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-3 text-xl transition-colors">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" /> Реклама
                                </h4>
                                <ul className="text-base text-white space-y-3 pl-4 border-l-2 border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                                    <li>Кампании (поиск)</li>
                                    <li>Креативы и офферы</li>
                                    <li>Оптимизация CPA</li>
                                </ul>
                            </div>

                            {/* Efficiency */}
                            <div className="bg-black/60 p-5 lg:p-6 rounded-2xl border border-white/10 hover:bg-black/80 transition-colors group">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-3 text-xl transition-colors">
                                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" /> Эффективность
                                </h4>
                                <ul className="text-base text-white space-y-3 pl-4 border-l-2 border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                                    <li>A/B тесты</li>
                                    <li>CRO Лендинга</li>
                                    <li>Рекомендации</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => openModal('links')}
                                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-bold hover:scale-[1.02] hover:shadow-[0_10px_30px_-5px_rgba(249,115,22,0.4)] transition-all shadow-lg shadow-orange-500/20 mb-4 text-lg"
                            >
                                Обсудить проект
                            </button>
                            <p className="text-xs text-white/50">
                                Эффект зависит от ниши, бюджета и продукта.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
