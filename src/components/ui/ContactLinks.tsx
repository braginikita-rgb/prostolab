"use client";

import { motion } from "framer-motion";
import { Mail, Send, Phone, X } from "lucide-react";
import { useModal } from "./ModalContext";

export function ContactLinks() {
    const { closeModal } = useModal();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm mx-auto p-8 rounded-[40px] overflow-hidden border border-white/20 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
            style={{
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
        >
            {/* Close Button */}
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-20"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Ambient Gradients inside card */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-white mb-2">На связи</h3>
                <p className="text-slate-400 text-sm mb-8">Выберите удобный способ</p>

                {/* Email Section */}
                <div className="w-full mb-8">
                    <a href="mailto:contact@prostolab.org" className="group flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        <Mail className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">
                            contact@prostolab.org
                        </span>
                    </a>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-6 justify-center">
                    {/* Telegram */}
                    <a
                        href="https://t.me/prostolab_design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 hover:border-sky-400/50 hover:from-sky-500/30 hover:to-blue-600/30 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:-translate-y-1"
                    >
                        <Send className="w-7 h-7 text-sky-400 group-hover:text-white transition-colors ml-[-2px] mt-[2px]" />
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/79939578800"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:-translate-y-1"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-green-400 group-hover:text-white transition-colors">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>

                    {/* Max */}
                    <a
                        href="https://max.ru/u/f9LHodD0cOIBeqrxWZHPuMDAKiMXlEoWcBzJNasncH6hEBOlTVgpaBgYn18"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 hover:border-orange-400/50 hover:from-orange-500/30 hover:to-red-600/30 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:-translate-y-1"
                    >
                        <svg viewBox="0 0 720 720" fill="currentColor" className="w-8 h-8 text-orange-400 group-hover:text-white transition-colors">
                            <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
