import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "medipic Online Care",
  description: "Medipic online care landing and intake experience.",
  applicationName: "medipic",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "medipic",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
