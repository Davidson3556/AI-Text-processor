import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import SidebarContent from "@/components/SidebarContent";
import { SidebarProvider } from "@/composables/sidebar";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DPT - AI Text processor",
  description:
    "Quickly summarize, translate, and identify the language of any text with this application.",
  authors: [{ name: "Davidson", url: "https://github.com/Davidson3556" }],
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta
          name="translator-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_TRANSLATOR_API_TRIAL_TOKEN}
        />
        <meta
          name="language-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_LANGUAGE_API_TRIAL_TOKEN}
        />
        <meta
          name="summarizer-api-trial-token"
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_SUMMARIZER_API_TRIAL_TOKEN}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex h-full">
              <SidebarContent />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 pt-24 md:pt-20 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
