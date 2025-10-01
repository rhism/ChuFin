import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ChuFin",
  keywords: ["website", "expense", "full-stack", "react", "next.js", "web development", "expense tracker",],
  description: "Manage your personal finances with ease",
  icons: {
    icon: "/wallet.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        className="dark"
        style={{ colorScheme: "dark" }}
      >
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <Toaster richColors position="bottom-right" />
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
