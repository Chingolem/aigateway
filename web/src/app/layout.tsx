import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naipigo | AI Gateway",
  description: "One API key for fable-5. Connect any OpenAI-compatible client.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
