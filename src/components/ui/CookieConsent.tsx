"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Show the banner shortly after load for better UX
            setTimeout(() => {
                setIsVisible(true);
            }, 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        window.dispatchEvent(new Event("cookie_consent_updated"));
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookie_consent", "rejected");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-[380px] w-auto"
                >
                    <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <span>🍪</span> Файлы Cookie
                                </h3>
                                <p className="text-sm text-white/50 leading-relaxed">
                                    Мы используем куки для улучшения работы сайта, аналитики и персонализации контента. 
                                </p>
                            </div>
                            
                            <div className="flex gap-3 mt-1">
                                <button
                                    onClick={handleReject}
                                    className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                >
                                    Отказать
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-colors text-sm font-medium shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                                >
                                    Разрешить
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
