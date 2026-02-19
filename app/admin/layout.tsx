
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import AdminGate from '@/components/admin/AdminGate';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: "Admin Portal",
    description: "Restricted Access",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased bg-slate-50 dark:bg-slate-900`}>
                <AdminGate>{children}</AdminGate>
            </body>
        </html>
    );
}
