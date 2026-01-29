import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowWeWorkSection } from "@/components/home/HowWeWorkSection";

import { WorkShowcaseSection } from "@/components/home/WorkShowcaseSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { MoonSection } from "@/components/home/MoonSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";

import { ModalProvider } from "@/components/ui/ModalContext";
import { ContactModal } from "@/components/ui/ContactModal";

export default function Home() {
    return (
        <ModalProvider>
            <main className="relative min-h-screen w-full max-w-none overflow-x-hidden bg-[#0a0a0a] text-slate-50">
                {/* Global Background Elements */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Global Noise */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] bg-repeat mix-blend-overlay" />


                </div>

                <div className="relative z-10">
                    <Navbar />
                    <Hero />
                    <HowWeWorkSection />
                    <WorkShowcaseSection />
                    <PackagesSection />
                    <MoonSection />
                    <FAQSection />
                    <Footer />
                </div>
                <ContactModal />
            </main>
        </ModalProvider>
    );
}
