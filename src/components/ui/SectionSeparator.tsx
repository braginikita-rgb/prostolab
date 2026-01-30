import React from 'react';

type SeparatorType = 'convex' | 'concave';

interface SectionSeparatorProps {
    type?: SeparatorType;
    className?: string;
    fill?: string; // Color of the Next section (e.g., #0a0a0a or #f8fafc)
}


export function SectionSeparator({ type = 'convex', className = '', fill = '#0a0a0a' }: SectionSeparatorProps) {
    return (
        <div className={`absolute left-0 right-0 w-full overflow-visible leading-none z-20 h-[40px] md:h-[80px] ${className}`} style={{ bottom: '-1px' }}>
            {type === 'convex' ? (
                // Convex: Curves OUTWARD (Valley / Dark Bulge Down) (Light shines from top)
                <svg className="block w-full h-full overflow-visible" viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <defs>
                        {/* 1. Main Neon Gradient (Vertical: Orange Top -> Purple Bottom) */}
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
                        </linearGradient>

                        {/* 2. Glass Reflection Gradient (Vertical) */}
                        <linearGradient id="glass1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                            <stop offset="30%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                            <stop offset="70%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                        </linearGradient>

                        {/* 3. Shadow Gradient */}
                        <linearGradient id="shadow1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.2 }} />
                        </linearGradient>

                        {/* Increased Blur for massive glow */}
                        <filter id="glow1" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="20" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* === LAYER 1: THE FILL (Background of Next Section) === */}
                    {/* Drawn FIRST so it sits behind the glowing border */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z"
                        fill={fill}
                    />

                    {/* === LAYER 2: GLOW & SHADOWS (Behind the tube but on top of fill) === */}
                    {/* 1. Ambient Glow (Massive) - Shifted Down 32px */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0"
                        stroke="url(#grad1)"
                        strokeWidth="60"
                        fill="none"
                        opacity="0.5"
                        transform="translate(0, 32)"
                        filter="url(#glow1)"
                    />

                    {/* 2. Drop Shadow - Shifted Down 24px */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0"
                        stroke="url(#shadow1)"
                        strokeWidth="30"
                        fill="none"
                        transform="translate(0, 24)"
                        opacity="0.5"
                    />

                    {/* === LAYER 3: THE MAIN TUBE (Foreground) === */}
                    {/* 3. Main Pipe Body (Ultra Fat) - Shifted Down 16px */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0"
                        stroke="url(#grad1)"
                        strokeWidth="24"
                        fill="none"
                        transform="translate(0, 16)"
                    />

                    {/* 4. Upper Specular Highlight - Shifted Down 12px */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0"
                        stroke="url(#glass1)"
                        strokeWidth="8"
                        fill="none"
                        transform="translate(0, 12)"
                        opacity="0.8"
                    />

                    {/* 5. Core Light - Shifted Down 16px */}
                    <path
                        d="M0,0 C480,80 960,80 1440,0"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                        transform="translate(0, 16)"
                        opacity="0.6"
                    />
                </svg>
            ) : (
                // Concave: Curves INWARD (Hill / Bulge UP)
                <svg className="block w-full h-full overflow-visible" viewBox="0 0 1440 80" preserveAspectRatio="none">
                    <defs>
                        {/* 1. Main Neon Gradient (Vertical) */}
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
                        </linearGradient>

                        {/* 2. Glass Reflection Gradient */}
                        <linearGradient id="glass2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                            <stop offset="30%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                            <stop offset="70%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
                            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
                        </linearGradient>

                        {/* 3. Shadow Gradient */}
                        <linearGradient id="shadow2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.2 }} />
                        </linearGradient>

                        <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="20" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* === LAYER 1: THE FILL === */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z"
                        fill={fill}
                    />

                    {/* === LAYER 2: GLOW & SHADOWS === */}
                    {/* 1. Ambient Glow */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80"
                        stroke="url(#grad2)"
                        strokeWidth="60"
                        fill="none"
                        opacity="0.6"
                        transform="translate(0, 16)"
                        filter="url(#glow2)"
                    />

                    {/* 2. Drop Shadow */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80"
                        stroke="url(#shadow2)"
                        strokeWidth="30"
                        fill="none"
                        transform="translate(0, 24)"
                        opacity="0.4"
                    />

                    {/* === LAYER 3: MAIN TUBE === */}
                    {/* 3. Main Pipe Body */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80"
                        stroke="url(#grad2)"
                        strokeWidth="24"
                        fill="none"
                        transform="translate(0, 8)"
                    />

                    {/* 4. Upper Specular Highlight */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80"
                        stroke="url(#glass2)"
                        strokeWidth="8"
                        fill="none"
                        transform="translate(0, 4)"
                        opacity="0.9"
                    />

                    {/* 5. Core Light */}
                    <path
                        d="M0,80 C480,0 960,0 1440,80"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                        transform="translate(0, 8)"
                        opacity="0.5"
                    />
                </svg>
            )}
        </div>
    );
}
