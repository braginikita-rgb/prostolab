import React from 'react';
import Image from 'next/image';

// SHARED IMAGE COMPONENT
// Renders the illustrated background with a consistent "cinematic vignette" to ensure text readability
const BackgroundImage = ({ src, alt, opacity = 1.0 }: { src: string, alt: string, opacity?: number }) => (
    <div className="absolute inset-0 z-[-1]">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            quality={75}
            priority
            style={{ opacity }}
        />
        {/* Cinematic Vignette Overlay to blend edges and darken for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
    </div>
);

interface SceneProps {
    className?: string;
    style?: React.CSSProperties;
    fadeStars?: boolean;
    mode?: 'full' | 'preview';
}

// SCENE 1: Hero (Purple Desert Sunset)
export const Scene1Bg = ({ className, style, mode = 'full' }: SceneProps) => (
    <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
        <BackgroundImage src="/assets/backgrounds/hero_landscape.png" alt="Hero Landscape" opacity={1.0} />

        {/* Dark Bottom Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Soft Sunrise Haze - Only in FULL mode */}
        {mode === 'full' && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent mix-blend-screen" />
        )}
    </div>
);

// SCENE 2: How We Work (Illustrated Stratosphere)
export const Scene2Bg = ({ className, style, mode = 'full' }: SceneProps) => (
    <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
        <BackgroundImage src="/assets/backgrounds/scene2_stratosphere.png" alt="Stratosphere Illustration" opacity={0.9} />
    </div>
);

// SCENE 3: About (Illustrated Deep Space Nebula)
export const Scene3Bg = ({ className, style, mode = 'full' }: SceneProps) => {
    if (mode === 'preview') return null;
    return (
        <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
            <BackgroundImage src="/assets/backgrounds/scene3_nebula.png" alt="Nebula Illustration" opacity={0.9} />
        </div>
    );
};

// SCENE 4: Packages (Illustrated Approach Corridor)
export const Scene4Bg = ({ className, style, mode = 'full' }: SceneProps) => (
    <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
        <BackgroundImage src="/assets/backgrounds/scene4_corridor.png" alt="Corridor Illustration" opacity={0.9} />
    </div>
);

// SCENE 5: Moon (Illustrated Moon Orbit - Cartoon Style Match)
export const Scene5Bg = ({ className, style, mode = 'full' }: SceneProps) => {
    if (mode === 'preview') return null;
    return (
        <div className={`absolute inset-0 z-[-1] pointer-events-none ${className}`} style={style}>
            <BackgroundImage src="/assets/backgrounds/scene5_moon_orbit.png" alt="Moon Orbit Illustration" opacity={1.0} />
        </div>
    );
};

// SCENE 6: Contact (Illustrated Alien Landing)
export const Scene6Bg = ({ className, style, mode = 'full' }: SceneProps) => (
    <div className={`absolute inset-0 z-[-1] pointer-events-none bg-[#0a0a0a] ${className}`} style={style}>
        {/* Background Image Removed as per request (Spaceship) */}
        {/* <BackgroundImage src="/assets/backgrounds/scene6_landing.png" alt="Landing Illustration" opacity={1.0} /> */}

        {/* Landing dust/haze - Only in FULL mode */}
        {mode === 'full' && (
            <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-orange-900/20 to-transparent mix-blend-screen" />
        )}
    </div>
);
