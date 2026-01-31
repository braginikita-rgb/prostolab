"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionSeparator } from "../ui/SectionSeparator";

// Tabs / Categories (Russian labels as requested: Блог, E-commerce, бизнес, финансы)
const categories = [
    { id: 0, label: "Портфолио", key: "portfolio" },
    { id: 1, label: "E-commerce", key: "ecommerce" },
    { id: 2, label: "Бизнес", key: "business" },
    { id: 3, label: "Финансы", key: "finance" }
];

// Projects matching the categories 1-to-1
const projects = [
    {
        title: "Mila Peach",
        category: "Портфолио",
        desc: "Beauty & Lifestyle Portfolio",
        gradient: "from-orange-200 to-rose-200",
        image: "/projects/portfolio.png"
    },
    {
        title: "LumiSkin",
        category: "E-commerce",
        desc: "Natural cosmetics store",
        gradient: "from-orange-500/20 to-red-500/20",
        image: "/projects/ecommerce.png"
    },
    {
        title: "Family Restaurant",
        category: "Бизнес",
        desc: "Cozy dining website",
        gradient: "from-purple-500/20 to-pink-500/20",
        image: "/projects/business.png"
    },
    {
        title: "Taxless Wallet",
        category: "Финансы",
        desc: "Crypto tax tracking",
        gradient: "from-emerald-500/20 to-teal-500/20",
        image: "/projects/finance.png"
    }
];

export function WorkShowcaseSection() {
    const [activeTab, setActiveTab] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollX, setScrollX] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Infinite Loop Logic
    // We replicate the projects 3 times: [Buffer Start, Main, Buffer End]
    // 4 projects * 3 = 12 items.
    // Indices: 0-3 (Buffer), 4-7 (Main), 8-11 (Buffer)
    const displayProjects = [...projects, ...projects, ...projects];
    const totalOriginal = projects.length;

    // Mouse Drag State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const itemWidth = isMobile && typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1000;
    const gap = 32;
    const singleSetWidth = totalOriginal * (itemWidth + gap);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        // Initial alignment: Center the first item of the MAIN set (index 4)
        // Actually, we want to align to the 'activeTab' in the MAIN set.
        // Initially activeTab=0, so index 4.
        if (containerRef.current) {
            const startOffset = activeTab * (itemWidth + gap); // correct for initial
            // But we are using 3 sets.
            // Set 1 (Main) starts at index 4.
            // So target index = 4 + activeTab.
            const targetIndex = totalOriginal + activeTab;
            // Calculate centering padding
            // We need to know containerWidth. If it's 0 (first render), this might be off.
            // We can rely on `centerPadding` in style, and just set scrollLeft to `targetIndex * (w+gap)`.
            // scrollLeft=0 means 0th item is at the start of content area (left edge + padding).
            // To center item, we just scroll to its `index * (w+gap)`.

            // Wait, updateDimensions sets isMobile. We need itemWidth updated.
            // We can do this in a timeout or separate effect dependent on isMobile.
        }

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Effect to initialize scroll position once dimensions are ready
    useEffect(() => {
        if (containerRef.current && containerWidth > 0) {
            const currentItemWidth = isMobile ? window.innerWidth * 0.85 : 1000;
            const targetIndex = totalOriginal; // Start of middle set
            containerRef.current.scrollLeft = targetIndex * (currentItemWidth + gap);
        }
    }, [containerWidth, isMobile]); // Run when dimensions stabilize


    // Scroll Handler
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const currentScroll = e.currentTarget.scrollLeft;
        setScrollX(currentScroll);

        const currentItemWidth = isMobile && typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1000;
        const setWidth = totalOriginal * (currentItemWidth + gap);

        // Infinite Scroll Jump
        // If we are too far left (in first set), jump forward
        if (currentScroll < setWidth / 2) {
            e.currentTarget.scrollLeft += setWidth;
            // We modify scrollLeft directly, which might trigger another scroll event, 
            // but usually browser handles this snap cleanly if we are careful.
        }
        // If we are too far right (in last set), jump backward
        else if (currentScroll > setWidth * 2.5) { // approaching end
            e.currentTarget.scrollLeft -= setWidth;
        }

        // Update Active Tab
        // Find center item
        // itemCenter = index * (w+g)
        // We iterate through ALL displayProjects to find closest
        let minDistance = Infinity;
        let closestIndex = 0;

        displayProjects.forEach((_, index) => {
            const itemCenter = index * (currentItemWidth + gap);
            const dist = Math.abs(currentScroll - itemCenter);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = index;
            }
        });

        // Map closestIndex to 0-3
        const realIndex = closestIndex % totalOriginal;

        if (realIndex !== activeTab && !isTabClick.current) {
            setActiveTab(realIndex);
        }
    };

    // Flag to prevent scroll listener from overriding click during animation
    const isTabClick = useRef(false);
    const animationRef = useRef<number | null>(null);
    const lastInteractionTime = useRef(Date.now());
    const tabTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const smoothScrollTo = (target: number, duration: number = 1000) => {
        if (!containerRef.current) return;

        // Cancel running animation
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const start = containerRef.current.scrollLeft;
        const change = target - start;
        const startTime = performance.now();
        let previousEase = 0;

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            // Normalize t (0 to 1)
            let t = elapsed / duration;
            if (t > 1) t = 1;

            // easeInOutSine
            const currentEase = -(Math.cos(Math.PI * t) - 1) / 2;

            // Calculate delta move
            const easeStep = currentEase - previousEase;
            const moveStep = change * easeStep;

            if (containerRef.current) {
                containerRef.current.scrollLeft += moveStep;
            }

            previousEase = currentEase;

            if (t < 1) {
                animationRef.current = requestAnimationFrame(animateScroll);
            } else {
                animationRef.current = null;
            }
        };
        animationRef.current = requestAnimationFrame(animateScroll);
    };

    const scrollToTab = (index: number) => {
        if (!containerRef.current) return;
        isTabClick.current = true;
        lastInteractionTime.current = Date.now();

        // Clear previous timeout to prevent early reset
        if (tabTimeoutRef.current) clearTimeout(tabTimeoutRef.current);

        // Cancel running animation to prevent conflicts
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        const currentItemWidth = isMobile && typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1000;
        const targetIndex = totalOriginal + index; // Safe middle set

        const targetScroll = targetIndex * (currentItemWidth + gap);

        // Use native smooth scroll for reliable interaction
        containerRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        setActiveTab(index);

        tabTimeoutRef.current = setTimeout(() => {
            isTabClick.current = false;
        }, 800);
    };

    // Drag Logic
    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        e.preventDefault(); // Prevent native drag/selection
        lastInteractionTime.current = Date.now(); // Interaction

        // Stop any active animation when user grabs
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            e.preventDefault();
            lastInteractionTime.current = Date.now(); // Update interaction time while dragging
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            containerRef.current.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            lastInteractionTime.current = Date.now(); // Update interaction time on drag end
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);

    // Auto-Scroll Logic
    useEffect(() => {
        if (isDragging || isMobile) return; // Disable auto-scroll on mobile

        const interval = setInterval(() => {
            if (containerRef.current) {
                // Skip if interacting recently or clicking tab
                if (isTabClick.current || Date.now() - lastInteractionTime.current < 4000) {
                    return;
                }

                const current = containerRef.current.scrollLeft;
                const setW = itemWidth + gap;
                const nextTarget = current + setW;
                smoothScrollTo(nextTarget, 4000); // Smooth 4s drift
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isDragging, itemWidth, gap, isMobile]);

    const centerPadding = containerWidth > 0 ? (containerWidth / 2) - (itemWidth / 2) : 0;

    return (
        <section className="relative z-20 min-h-screen w-full py-32 bg-[#0a0a0a] overflow-hidden flex flex-col justify-center">

            {/* Background Environment */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-noise opacity-[0.04]" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full">

                {/* Header */}
                <div className="text-center mb-12 px-6">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
                        Всё, что вам нужно <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                            для запуска онлайн.
                        </span>
                    </h2>
                    <h3 className="text-lg md:text-xl text-slate-400 font-medium uppercase tracking-widest">
                        Примеры наших работ
                    </h3>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-16 px-6">
                    <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {categories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToTab(index)}
                                className={`relative px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${activeTab === index ? "text-white" : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {activeTab === index && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute inset-0 bg-white/[0.1] border border-white/[0.1] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-10 items-center gap-8 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x"
                    onScroll={handleScroll}
                    onMouseDown={onMouseDown}
                    style={{
                        scrollBehavior: isDragging || isTabClick.current ? 'auto' : 'smooth',
                        paddingLeft: centerPadding > 0 ? centerPadding : '20px',
                        paddingRight: centerPadding > 0 ? centerPadding : '20px',
                    }}
                >
                    <AnimatePresence mode="wait">
                        {displayProjects.map((project, index) => (
                            <CarouselItem
                                key={`project-${index}`}
                                project={project}
                                index={index}
                                scrollX={scrollX}
                                itemWidth={itemWidth}
                            />
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

function CarouselItem({ project, index, scrollX, itemWidth }: { project: any, index: number, scrollX: number, itemWidth: number }) {
    const gap = 32;
    const itemCenter = index * (itemWidth + gap);
    const distance = Math.abs(scrollX - itemCenter);
    const maxEffectDistance = itemWidth + gap;

    // Scale calculation
    let scale = 1 - (distance / maxEffectDistance) * 0.15;
    scale = Math.max(0.85, Math.min(1, scale));

    // Opacity/Blur
    let opacity = 1 - (distance / maxEffectDistance) * 0.6;
    opacity = Math.max(0.4, Math.min(1, opacity));

    // Active state for highlighting
    const isActive = distance < itemWidth / 2;

    return (
        <motion.div
            className="snap-center shrink-0 flex flex-col gap-6"
            style={{
                width: itemWidth,
                scale,
                opacity,
                filter: `blur(${distance > maxEffectDistance / 2 ? 2 : 0}px)`,
                transition: 'all 0.1s ease-out'
            }}
        >
            <ProjectCard project={project} isActive={isActive} />
        </motion.div>
    );
}

function ProjectCard({ project, isActive }: { project: any, isActive: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative flex flex-col gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >
                <div className={`relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#151515] border border-white/[0.1] shadow-2xl transition-all duration-500 ${isHovered ? "border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)] -translate-y-2" : "hover:border-white/20"} ${isActive ? 'ring-1 ring-white/10' : ''}`}>

                    {/* Interaction Overlay - Prevents image dragging */}
                    <div className="absolute inset-0 z-50 bg-transparent" />

                    {/* Content: Image or Gradient */}
                    {project.image ? (
                        <div className="absolute inset-0 top-0 bg-[#151515]">
                            <img
                                src={project.image}
                                alt={project.title}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                            />
                            {/* Subtle overlay for better text contrast if needed? Usually showcase images should be clear. */}
                        </div>
                    ) : (
                        <div className={`absolute inset-0 top-0 bg-gradient-to-br ${project.gradient} opacity-50 flex items-center justify-center`}>
                            <div className="text-white/20 font-bold text-4xl uppercase tracking-widest transform -rotate-12 select-none">
                                {project.title}
                            </div>
                        </div>
                    )}

                    {/* Hover Glow Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`} />

                </div>
            </motion.div>


        </div>
    );
}
