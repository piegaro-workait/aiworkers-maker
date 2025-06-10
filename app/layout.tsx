import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";

export const metadata: Metadata = {
  title: "Responses starter app",
  description: "Starter app for the OpenAI Responses API",
  icons: {
    icon: "/openai_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
          <div className="flex h-screen bg-gray-200 w-full flex-col text-stone-900">
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </body>
    </html>
  );
}
