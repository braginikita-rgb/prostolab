"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import { useModal } from "./ModalContext";

type ProjectType = "landing" | "multipage";
type SitePurpose = "business" | "portfolio" | "ecommerce" | "other";
type ContactMethod = "telegram" | "whatsapp" | "mail" | "phone";

export const ContactForm = () => {
    const { closeModal } = useModal();
    const [formData, setFormData] = useState({
        projectType: "landing" as ProjectType,
        pagesCount: 0,
        sitePurpose: "business" as SitePurpose,
        idea: "",
        name: "",
        email: "",
        phone: "",
        contactMethods: [] as ContactMethod[],
        telegramUsername: "",
        consentData: false,
        consentPromo: false,
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const toggleContactMethod = (method: ContactMethod) => {
        setFormData(prev => {
            const exists = prev.contactMethods.includes(method);
            if (exists) {
                return { ...prev, contactMethods: prev.contactMethods.filter(m => m !== method) };
            } else {
                return { ...prev, contactMethods: [...prev.contactMethods, method] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    projectType: "landing",
                    pagesCount: 0,
                    sitePurpose: "business",
                    idea: "",
                    name: "",
                    email: "",
                    phone: "",
                    contactMethods: [],
                    telegramUsername: "",
                    consentData: false,
                    consentPromo: false,
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const inputStyles =
        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-300 placeholder:text-white/30 text-white backdrop-blur-sm relative z-10";

    const labelStyles = "block text-sm text-slate-400 mb-2 font-medium";

    // SVGs for social icons to ensure consistent style (stroked 2px like lucide)
    const TelegramIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1 0 0 0 .933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.349-1.494 1.274-5.487 2.091-8.984l1.583-6.749c.072-.31.083-.58-.002-.791-.085-.212-.297-.373-.655-.315z" /></svg>
    );

    const WhatsappIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto p-8 rounded-[40px] relative overflow-hidden overflow-y-auto max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border border-white/20 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
            style={{
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
        >
            <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all z-50 group pointer-events-auto"
                aria-label="Close modal"
            >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Liquid Glass Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")
                    `
                }}
            />

            {/* Ambient Gradients - Deep & Rich */}
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                Обсудим ваш проект
            </h2>
            <p className="text-white/40 mb-8">
                Расскажите о вашей идее, и мы предложим лучшее решение
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                {/* 1. Project Type */}
                <div className="space-y-4">
                    <label className={labelStyles}>Что вы планируете создать?</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: "landing" })}
                            className={`p-4 rounded-xl border transition-all text-center flex items-center justify-center ${formData.projectType === "landing"
                                ? "bg-orange-500/20 border-orange-500 text-orange-400"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                }`}
                        >
                            Лендинг
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: "multipage" })}
                            className={`p-4 rounded-xl border transition-all text-center flex items-center justify-center ${formData.projectType === "multipage"
                                ? "bg-purple-500/20 border-purple-500 text-purple-400"
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                                }`}
                        >
                            Многостраничный
                        </button>
                    </div>

                    <AnimatePresence>
                        {formData.projectType === "multipage" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <label className={labelStyles}>Примерное количество страниц</label>
                                <input
                                    type="number"
                                    min="2"
                                    placeholder="Например: 5"
                                    className={inputStyles}
                                    value={formData.pagesCount || ""}
                                    onChange={(e) => setFormData({ ...formData, pagesCount: parseInt(e.target.value) || 0 })}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. Site Purpose */}
                <div>
                    <label className={labelStyles}>Назначение сайта</label>
                    <select
                        value={formData.sitePurpose}
                        onChange={(e) => setFormData({ ...formData, sitePurpose: e.target.value as SitePurpose })}
                        className={`${inputStyles} appearance-none cursor-pointer`}
                    >
                        <option value="business" className="bg-slate-900">Бизнес / Корпоративный</option>
                        <option value="portfolio" className="bg-slate-900">Портфолио</option>
                        <option value="ecommerce" className="bg-slate-900">E-commerce / Магазин</option>
                        <option value="other" className="bg-slate-900">Другое</option>
                    </select>
                </div>

                {/* 3. Idea */}
                <div>
                    <label className={labelStyles}>Опишите вашу идею (опционально)</label>
                    <textarea
                        rows={3}
                        placeholder="Основные цели, функции или референсы..."
                        className={`${inputStyles} resize-none`}
                        value={formData.idea}
                        onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    />
                </div>

                {/* 4. Contact Info */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white">Контактные данные</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                required
                                className={inputStyles}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Телефон"
                                required
                                className={inputStyles}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email для связи"
                            required
                            className={inputStyles}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                {/* 5. preferred Contact Method */}
                <div className="space-y-3 pt-2">
                    <label className={labelStyles}>Как с вами связаться?</label>
                    <div className="flex gap-3 justify-between">
                        {[
                            { id: "telegram" as ContactMethod, icon: TelegramIcon },
                            { id: "whatsapp" as ContactMethod, icon: WhatsappIcon },
                            { id: "mail" as ContactMethod, icon: Mail },
                            { id: "phone" as ContactMethod, icon: Phone },
                        ].map(({ id, icon: Icon }) => {
                            const isSelected = formData.contactMethods.includes(id);
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => toggleContactMethod(id)}
                                    className={`flex-1 aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 border ${isSelected
                                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <Icon className={`w-8 h-8 ${isSelected ? "stroke-2" : "stroke-[1.5]"}`} />
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {formData.contactMethods.includes("telegram") && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <input
                                    type="text"
                                    placeholder="@username (Telegram)"
                                    className={`${inputStyles} mt-3`}
                                    value={formData.telegramUsername}
                                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 6. Consents */}
                <div className="space-y-3 pt-2">
                    {/* Data Processing Consent */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative pt-[2px]">
                            <input
                                type="checkbox"
                                required
                                className="peer sr-only"
                                checked={formData.consentData}
                                onChange={(e) => setFormData({ ...formData, consentData: e.target.checked })}
                            />
                            {/* Checkbox Style: Border only, Checkmark appears via sibling selector on DIV */}
                            <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-all flex items-center justify-center">
                                <svg className={`w-3.5 h-3.5 text-orange-500 transition-opacity ${formData.consentData ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm text-slate-400 select-none group-hover:text-slate-300 transition-colors">
                            Я согласен на <a href="/consent" target="_blank" className="text-orange-400 hover:text-orange-300 underline underline-offset-2 relative z-10" onClick={(e) => e.stopPropagation()}>обработку персональных данных</a>
                        </span>
                    </label>

                    {/* Promo Consent */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative pt-[2px]">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={formData.consentPromo}
                                onChange={(e) => setFormData({ ...formData, consentPromo: e.target.checked })}
                            />
                            {/* Both are orange now as requested */}
                            <div className="w-5 h-5 rounded-md border border-white/20 bg-white/5 peer-checked:border-orange-500 peer-checked:bg-orange-500/10 transition-all flex items-center justify-center">
                                <svg className={`w-3.5 h-3.5 text-orange-500 transition-opacity ${formData.consentPromo ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm text-slate-400 select-none group-hover:text-slate-300 transition-colors">
                            Даю разрешение на отправку рекламных акций
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={status === "loading" || !formData.consentData || !formData.name || !formData.phone || !formData.email || formData.contactMethods.length === 0}
                    className={`w-full font-medium py-4 rounded-xl transition-all duration-300 mt-4 shadow-lg
                        ${status === "loading" || !formData.consentData || !formData.name || !formData.phone || !formData.email || formData.contactMethods.length === 0
                            ? "bg-transparent border border-white/10 text-slate-500 cursor-not-allowed shadow-none"
                            : "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90 hover:shadow-orange-500/20"
                        }`}
                >
                    {status === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>

                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm"
                    >
                        Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                    </motion.div>
                )}
                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm"
                    >
                        Произошла ошибка. Пожалуйста, попробуйте еще раз.
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};
