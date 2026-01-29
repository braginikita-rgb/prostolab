"use client";

import { motion } from "framer-motion";

interface ServiceCard {
    label: string;
    angle: number; // degrees
    radius: number; // pixels from center
    size: "large" | "medium";
}

const services: ServiceCard[] = [
    // Large cards - main services at cardinal points
    { label: "Сайт", angle: 0, radius: 280, size: "large" },
    { label: "Лендинг", angle: 90, radius: 280, size: "large" },
    { label: "Контент", angle: 180, radius: 280, size: "large" },
    { label: "Реклама", angle: 270, radius: 280, size: "large" },

    // Medium cards - features between main services
    { label: "Быстро", angle: 45, radius: 200, size: "medium" },
    { label: "Доступно", angle: 135, radius: 200, size: "medium" },
    { label: "Просто", angle: 225, radius: 200, size: "medium" },
    { label: "Адаптивно", angle: 315, radius: 200, size: "medium" },
    { label: "SEO", angle: 60, radius: 240, size: "medium" },
    { label: "Поддержка", angle: 300, radius: 240, size: "medium" },
];

export function ServicesGrid() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden">
            {/* Central Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10 text-center"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-purple-200 to-orange-200 bg-clip-text text-transparent">
                        ProstoLab
                    </span>
                </h2>
            </motion.div>

            {/* Orbital Cards */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-4xl max-h-4xl">
                    {services.map((service, index) => (
                        <ServiceCardComponent
                            key={service.label}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ServiceCardProps {
    service: ServiceCard;
    index: number;
}

function ServiceCardComponent({ service, index }: ServiceCardProps) {
    // Convert angle to radians
    const angleRad = (service.angle * Math.PI) / 180;

    // Calculate position using trigonometry
    // Adjust radius for mobile
    const mobileRadius = service.size === "large" ? 140 : 100;

    // Position from center (50%, 50%)
    const x = Math.sin(angleRad) * service.radius;
    const y = -Math.cos(angleRad) * service.radius;

    const mobileX = Math.sin(angleRad) * mobileRadius;
    const mobileY = -Math.cos(angleRad) * mobileRadius;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
            }}
            className="absolute pointer-events-auto"
            style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${mobileX}px), calc(-50% + ${mobileY}px))`,
            }}
        >
            <div
                className={`
                    glass-card
                    ${service.size === "large" ? "glass-card-large" : "glass-card-medium"}
                `}
                style={{
                    // Desktop positioning via CSS custom property
                    // @ts-ignore
                    "--desktop-x": `${x}px`,
                    "--desktop-y": `${y}px`,
                }}
            >
                {service.label}
            </div>
        </motion.div>
    );
}
