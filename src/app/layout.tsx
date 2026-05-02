import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "medipic — Online Medical Consultation",
  description: "Online doctor consultation and prescription delivery. ¥0 consultation fee.",
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
