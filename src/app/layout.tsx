import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ProstoLab - Digital Production",
    description: "ProstoLab is a high-end digital production agency.",
    openGraph: {
        type: "website",
        title: "ProstoLab",
        description: "ProstoLab is a high-end digital production agency.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={cn(inter.className, "min-h-full w-full overflow-x-hidden antialiased bg-black text-text")}>
                {/* Noise Overlay */}
                <div className="noise-overlay" aria-hidden="true" />

                {/* Main Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
