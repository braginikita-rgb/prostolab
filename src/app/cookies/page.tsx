"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModalProvider } from "@/components/ui/ModalContext";
import { ContactModal } from "@/components/ui/ContactModal";

export default function CookiesPage() {
    return (
        <ModalProvider>
            <main className="relative min-h-screen w-full bg-[#0a0a0a] text-slate-50 overflow-x-hidden">
                {/* Global Background Elements (Simplified) */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] bg-repeat mix-blend-overlay" />
                    <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                </div>

                <div className="relative z-10">
                    <Navbar />

                    <div className="pt-32 pb-20 px-6">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Политика использования файлов Cookie</h1>

                            <div className="prose prose-invert prose-lg text-slate-400 space-y-8">
                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">1. Что такое файлы cookie?</h2>
                                    <p>
                                        Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или смартфоне) при посещении веб-сайта. Они позволяют сайту «запоминать» вас и ваши предпочтения (например, язык, размер шрифта и другие параметры отображения) на определенный период времени.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">2. Как мы используем файлы cookie?</h2>
                                    <p>
                                        Мы используем файлы cookie для обеспечения корректной работы сайта prostolab.ru, а также для аналитики, чтобы понимать, как пользователи взаимодействуют с нашим сайтом, и улучшать пользовательский опыт.
                                    </p>
                                    <p className="mt-4">
                                        Мы используем следующие типы файлов cookie:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 space-y-2">
                                        <li><strong>Обязательные (технические) cookie:</strong> Необходимы для функционирования сайта и использования его основных возможностей. Без них сайт может работать некорректно.</li>
                                        <li><strong>Аналитические cookie:</strong> Позволяют нам собирать обезличенную информацию о том, как посетители используют сайт (популярные страницы, время пребывания и т.д.). Мы используем сервисы Яндекс.Метрика и Google Analytics.</li>
                                        <li><strong>Функциональные cookie:</strong> Позволяют сайту запоминать выбранные вами настройки (например, язык интерфейса).</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">3. Управление файлами cookie</h2>
                                    <p>
                                        Вы можете управлять файлами cookie и удалять их по своему желанию. Вы можете удалить все cookie, уже сохраненные на вашем устройстве, и настроить большинство браузеров так, чтобы они блокировали установку cookie. Однако в этом случае вам, возможно, придется вручную настраивать некоторые параметры при каждом посещении сайта, а некоторые сервисы и функции могут не работать.
                                    </p>
                                    <p className="mt-4">
                                        Подробнее о настройке cookie в вашем браузере можно узнать в справке используемого вами браузера (Chrome, Safari, Firefox, Edge и др.).
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">4. Контактная информация</h2>
                                    <p>
                                        Если у вас возникли вопросы относительно использования файлов cookie на нашем сайте, пожалуйста, свяжитесь с нами по электронной почте: <a href="mailto:contact@prostolab.org" className="text-orange-400 hover:text-orange-300 transition-colors">contact@prostolab.org</a>.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
                <ContactModal />
            </main>
        </ModalProvider>
    );
}
