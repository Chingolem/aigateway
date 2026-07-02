import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";

export const metadata: Metadata = {
  title: "aigateway | AI API Router",
  description: "One key for all AI models. Route Claude, GPT, Gemini and more through localhost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
