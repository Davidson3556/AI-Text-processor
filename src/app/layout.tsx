import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import  SidebarContent  from "@/components/SidebarContent";
import { SidebarProvider } from "@/composables/sidebar";



import "./globals.css";
import { HomeIcon } from "lucide-react";

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
  description: "Quickly summarize, translate, and identify the language of any text with this application.",
  authors: [{ name: "Davidson", url: "https://github.com/Davidson3556" }],
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex h-full">
            <SidebarContent />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 p-6 pt-24 md:pt-20 overflow-hidden">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}

