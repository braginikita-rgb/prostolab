"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModalProvider } from "@/components/ui/ModalContext";
import { ContactModal } from "@/components/ui/ContactModal";

export default function ConsentPage() {
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
                            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Согласие на обработку персональных данных</h1>

                            <div className="prose prose-invert prose-lg text-slate-400 space-y-8">
                                <section>
                                    <p>
                                        Физическое лицо, оставляя заявку на веб-сайте prostolab.ru через форму «Связаться с нами», «Заказать», «Получить консультацию» или иные формы, действуя свободно, своей волей и в своем интересе, а также подтверждая свою дееспособность, предоставляет свое согласие на обработку персональных данных (далее — Согласие) Оператору (ProstoLab).
                                    </p>
                                    <p className="mt-4">
                                        Согласие дается на обработку следующих персональных данных:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 space-y-2">
                                        <li>Фамилия, имя, отчество;</li>
                                        <li>Номера контактных телефонов;</li>
                                        <li>Адреса электронной почты;</li>
                                        <li>Пользовательские данные (сведения о местоположении; тип и версия ОС; тип и версия Браузера; тип устройства и разрешение его экрана; источник, откуда пришел на сайт пользователь; с какого сайта или по какой рекламе; язык ОС и Браузера; какие страницы открывает и на какие кнопки нажимает пользователь; ip-адрес).</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">Цели обработки персональных данных:</h2>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Обработка входящих запросов физических лиц с целью оказания консультирования;</li>
                                        <li>Аналитика действий физического лица на веб-сайте и функционирования веб-сайта;</li>
                                        <li>Проведение рекламных и новостных рассылок.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">Основание для обработки персональных данных:</h2>
                                    <p>
                                        Основанием для обработки персональных данных является: ст. 24 Конституции Российской Федерации; ст. 6 Федерального закона №152-ФЗ «О персональных данных»; настоящее согласие на обработку персональных данных.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">Действия с персональными данными:</h2>
                                    <p>
                                        В ходе обработки с персональными данными будут совершены следующие действия: сбор; запись; систематизация; накопление; хранение; уточнение (обновление, изменение); извлечение; использование; передача (распространение, предоставление, доступ); блокирование; удаление; уничтожение.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-semibold text-white mb-4">Срок действия согласия:</h2>
                                    <p>
                                        Согласие обрабатывается до достижения целей обработки или до момента утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.
                                    </p>
                                    <p className="mt-4">
                                        Согласие может быть отозвано нами путем направления письменного заявления Оператору на электронный адрес contact@prostolab.org.
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
