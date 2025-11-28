import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ingat-In Dashboard",
  description: "Real-time WhatsApp Bot Attendance Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
