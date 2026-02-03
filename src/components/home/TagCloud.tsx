"use client";

import { MotionValue, motion, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface TagCloudProps {
    scrollYProgress: MotionValue<number>;
}

interface TagPosition {
    id: string;
    label: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    size: "xl" | "large" | "medium" | "small";
}

// DETERMINISTIC POSITIONS (LOCKED LAYOUT)
// Desktop Safe Rect: X 32-68%, Y 34-66%
const DESKTOP_POSITIONS: TagPosition[] = [
    // Top Zone
    { id: "result", label: "Результат", x: 35, y: 18, size: "large" },
    { id: "terms", label: "Сроки", x: 64, y: 16, size: "large" },

    // Right Zone
    { id: "fast", label: "Быстро", x: 78, y: 30, size: "xl" },
    { id: "clear", label: "Прозрачно", x: 83, y: 52, size: "medium" },
    { id: "support", label: "Поддержка", x: 67, y: 76, size: "medium" },

    // Bottom Zone
    { id: "adapt", label: "Адаптивно", x: 38, y: 78, size: "small" },

    // Left Zone
    { id: "neat", label: "Аккуратно", x: 18, y: 62, size: "small" },
    { id: "underst", label: "Понятно", x: 22, y: 36, size: "small" },
];

const MOBILE_POSITIONS: TagPosition[] = [
    // Mobile Zig-Zag Layout - Spaced out to avoid center text overlap
    // Left Top (Higher)
    { id: "terms", label: "Сроки", x: 25, y: 15, size: "large" },
    // Right Top (Lower than first, but still high)
    { id: "result", label: "Результат", x: 75, y: 22, size: "large" },

    // Center Content Zone (approx 30-70% is now safe)

    // Left Bottom
    { id: "adapt", label: "Адаптивно", x: 25, y: 78, size: "large" },
    // Right Bottom (Lower)
    { id: "clear", label: "Прозрачно", x: 75, y: 88, size: "medium" },
];

export function TagCloud({ scrollYProgress }: TagCloudProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [positions, setPositions] = useState<TagPosition[]>(DESKTOP_POSITIONS);
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Mouse Parallax State (Max 8px)
    const mouseX = useSpring(0, { stiffness: 40, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 40, damping: 30 });

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setPositions(mobile ? MOBILE_POSITIONS : DESKTOP_POSITIONS);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (isMobile || shouldReduceMotion) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        if (!window.matchMedia("(hover: none)").matches) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [shouldReduceMotion, mouseX, mouseY, isMobile]);

    const containerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const containerScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

    return (
        <motion.div
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ opacity: containerOpacity, scale: containerScale }}
        >
            {positions.map((tag, index) => (
                <Tag
                    key={tag.id}
                    data={tag}
                    index={index}
                    reducedMotion={shouldReduceMotion ?? false}
                    isMobile={isMobile}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}
        </motion.div>
    );
}

interface TagProps {
    data: TagPosition;
    index: number;
    reducedMotion: boolean;
    isMobile: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

function Tag({ data, index, reducedMotion, isMobile, mouseX, mouseY }: TagProps) {
    const isLeftSide = data.x < 50;

    // Sizes
    const sizeClasses = {
        xl: "px-7 py-3 text-lg md:text-[22px] font-bold",
        large: "px-6 py-2.5 text-lg md:text-[20px] font-bold",
        medium: "px-5 py-2 text-base md:text-lg font-semibold",
        small: "px-4 py-1.5 text-sm md:text-base font-medium"
    };

    // Brand Tint Classes
    const tintClasses = isLeftSide
        ? "border-orange-500/20 bg-gradient-to-br from-orange-500/[0.05] to-white/[0.01] shadow-[0_6px_20px_rgba(249,115,22,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
        : "border-violet-600/20 bg-gradient-to-bl from-violet-600/[0.05] to-white/[0.01] shadow-[0_6px_20px_rgba(124,58,237,0.1),inset_0_1px_0_0_rgba(255,255,255,0.2)]";

    const textGlow = isLeftSide
        ? "drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]"
        : "drop-shadow-[0_0_12px_rgba(124,58,237,0.4)]";

    // Smooth Parallax (Max 8px)
    const parallaxFactor = 8;
    const x = useTransform(mouseX, [-1, 1], [-parallaxFactor, parallaxFactor]);
    const y = useTransform(mouseY, [-1, 1], [-parallaxFactor, parallaxFactor]);

    const shouldAnimate = !isMobile && !reducedMotion;
    const floatDuration = 4 + index * 0.7;

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${data.x}%`, top: `${data.y}%` }}
        >
            <motion.div style={{ x: shouldAnimate ? x : 0, y: shouldAnimate ? y : 0 }}>
                <motion.div
                    animate={shouldAnimate ? { y: [-2, 2, -2] } : {}}
                    transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                    }}
                >
                    <motion.div
                        className={`
                            relative flex items-center justify-center rounded-full 
                            ${isMobile ? '' : 'backdrop-blur-[20px]'} border 
                            text-slate-50 tracking-wide overflow-hidden
                            transition-all duration-500 cursor-default pointer-events-auto
                            hover:scale-105 hover:border-white/60 hover:bg-white/[0.2]
                            ${sizeClasses[data.size]}
                            ${tintClasses}
                        `}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.05 + 0.2,
                            type: "spring",
                            stiffness: 50
                        }}
                    >
                        {/* Sheen Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/15 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Top Edge Specular */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-70 pointer-events-none" />

                        <span className={`relative z-10 whitespace-nowrap ${textGlow}`}>
                            {data.label}
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
