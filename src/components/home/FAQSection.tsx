"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { SectionSeparator } from "../ui/SectionSeparator";
import { useModal } from "@/components/ui/ModalContext";

type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    { question: "Сколько занимает запуск?", answer: "Обычно 3–7 дней для лендинга и 7–14 дней для сайта, зависит от объёма." },
    { question: "Что нужно от меня для старта?", answer: "Короткий бриф, примеры, контент (если есть), доступ к домену/хостингу при необходимости." },
    { question: "Вы делаете дизайн с нуля?", answer: "Да, под задачу. Можем опираться на референсы или ваш бренд-стиль." },
    { question: "Можно ли потом редактировать сайт?", answer: "Да. Передаём код/структуру и можем подключить удобное управление контентом по запросу." },
    { question: "Подключаете аналитику?", answer: "Да: GA4/Метрика, события/цели, UTM, базовые отчёты." },
    { question: "Запускаете рекламу?", answer: "Да: настройка кампаний, креативы, оптимизация по метрикам (CPA/CPL) при наличии бюджета." },
    { question: "Гарантируете рост просмотров/кликов?", answer: "Нет гарантий по результату, но делаем измеримую оптимизацию и прозрачную отчётность." },
    { question: "Что входит в поддержку?", answer: "Правки контента, мелкие улучшения, контроль работоспособности — формат зависит от пакета." },
    { question: "Где будет размещён сайт?", answer: "На вашем или рекомендованном хостинге; поможем с доменом и деплоем." },
    { question: "Как проходит оплата?", answer: "Обычно предоплата за этап + финальный платёж после сдачи." },
];

export function FAQSection() {
    const { openModal } = useModal();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Split data for 2 columns on desktop
    const half = Math.ceil(faqData.length / 2);
    const col1 = faqData.slice(0, half);
    const col2 = faqData.slice(half);

    return (
        <section id="faq" className="relative z-30 w-full bg-[#f8fafc] text-slate-900 py-32 md:py-64 overflow-hidden">
            {/* Top Separator (Dark -> White) */}
            <SectionSeparator type="convex" fill="#f8fafc" className="top-0 z-30 pointer-events-none bg-[#0a0a0a]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Остались вопросы?
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Постараемся на них ответить
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-20 items-start">
                    <div className="space-y-4">
                        {col1.map((item, i) => (
                            <FAQItemCard
                                key={i}
                                item={item}
                                isOpen={openIndex === i}
                                onToggle={() => toggleItem(i)}
                            />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {col2.map((item, i) => (
                            <FAQItemCard
                                key={i + half}
                                item={item}
                                isOpen={openIndex === (i + half)}
                                onToggle={() => toggleItem(i + half)}
                            />
                        ))}
                    </div>
                </div>

                {/* Mini CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="text-slate-500 font-medium">Не нашли ответ?</p>
                    <button
                        onClick={() => openModal('links')}
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-orange-600 transition-colors shadow-xl shadow-slate-900/10 hover:shadow-orange-500/20"
                    >
                        Свяжитесь с нами
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>

            {/* Bottom Separator (White -> Dark) */}
            <SectionSeparator type="convex" fill="#f8fafc" className="bottom-[-1px] z-30 bg-black rotate-180" />
        </section>
    );
}

function FAQItemCard({ item, isOpen, onToggle }: { item: FAQItem, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="rounded-[40px] bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="font-bold text-lg pr-4">{item.question}</span>
                <span className={`p-2 rounded-full bg-slate-100 text-slate-500 transition-colors ${isOpen ? "bg-orange-100 text-orange-600" : ""}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
