"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionSeparator } from "../ui/SectionSeparator";

const aboutFeatures = [
    {
        title: "Креативность",
        description: "Уникальные решения для каждого проекта",
        icon: "✨"
    },
    {
        title: "Опыт",
        description: "5+ лет создания digital-продуктов",
        icon: "🚀"
    },
    {
        title: "Качество",
        description: "Внимание к каждой детали дизайна",
        icon: "💎"
    }
];

export function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative z-20 min-h-0 w-full pt-12 pb-24 overflow-hidden bg-[#0a0a0a]"
        >
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 h-full"
                style={{ y }}
            >
                {/* Environment Contrast for Glass Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Colored lights removed as per user request */}
                    <div className="absolute inset-0 bg-noise opacity-[0.04]" />
                </div>
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 relative"
                >

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                        Реклама
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Мы — digital production студия, создающая премиальные веб-решения для бизнеса любого масштаба
                    </p>
                </motion.div>

                {/* Feature Cards - Scene 3 Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Креативность", desc: "Уникальные визуальные решения", icon: "✨" },
                        { title: "Опыт", desc: "Экспертиза в создании digital-продуктов", icon: "🧠" },
                        { title: "Качество", desc: "Внимание к каждой детали дизайна", icon: "💎" }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <div className="relative overflow-hidden rounded-[40px] bg-white/[0.03] backdrop-blur-md border border-white/[0.1] p-8 h-full flex flex-col items-start shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] group">
                                <div className="text-4xl mb-6 p-4 rounded-[40px] bg-white/[0.05] border border-white/[0.1] backdrop-blur-md relative z-10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed font-light relative z-10">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Row - Safe Claims */}
                < motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 opacity-0"
                >
                    {
                        [
                            { title: "Проекты", subtitle: "В разных нишах" },
                            { title: "Сроки", subtitle: "Соблюдаем дедлайны" },
                            { title: "Фокус", subtitle: "На результате" },
                            { title: "Поддержка", subtitle: "По договоренности" }
                        ].map((stat) => (
                            <div
                                key={stat.title}
                                className="relative overflow-hidden rounded-[40px] bg-white/[0.03] backdrop-blur-md border border-white/[0.1] p-6 text-center flex flex-col justify-center min-h-[140px] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] group"
                            >
                                <div className="text-xl md:text-2xl font-bold text-white mb-2 relative z-10">
                                    {stat.title}
                                </div>
                                <div className="text-sm text-slate-300 relative z-10">
                                    {stat.subtitle}
                                </div>
                            </div>
                        ))
                    }
                </motion.div >
            </motion.div >

        </section >
    );
}
