import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/components/Providers/Providers";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import StoreProvider from "@/StoreProvider/StoreProvider";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

// Font Configuration
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Armat School",
    template: "%s | Armat School",
  },
  description: "Learn and grow with Armat Educational Platform",
  icons: {
    icon: "/images/armat-school-logo.svg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistSans.variable} ${geistMono.variable} h-full  antialiased`}
    >
      <body className="min-h-full  flex flex-col font-sans">
        <Providers>
          <LanguageProvider>
            <AuthProvider>
              <StoreProvider>{children}</StoreProvider>
            </AuthProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
