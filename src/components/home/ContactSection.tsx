"use client";

import { motion } from "framer-motion";
import { Scene6Bg } from "./backgrounds/SceneBackgrounds";
import { useModal } from "@/components/ui/ModalContext";

export function ContactSection() {
    const { openModal } = useModal();
    return (
        <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden py-20 z-50">
            {/* Scene 6 Background Layer */}
            <Scene6Bg className="scene-bg" />

            <div className="relative z-10 w-full px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-white"
                    >
                        Готовы к посадке?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400"
                    >
                        Оставьте заявку, и мы обсудим детали вашего полета.
                    </motion.p>
                </div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => openModal()}
                    className="px-8 py-4 bg-orange-600 text-white rounded-full text-xl font-bold shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:bg-orange-500 hover:shadow-[0_4px_30px_rgba(234,88,12,0.6)] transition-all"
                >
                    Связаться с нами
                </motion.button>
            </div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-8 text-slate-600 text-sm">
                © 2026 ProstoLab. All systems nominal.
            </div>
        </section>
    );
}
