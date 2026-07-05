import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/booking/ThemeProvider";
import { ReduxProvider } from "@/components/booking/ReduxProvider";
import { Header } from "@/components/booking/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Simple and intuitive hotel booking experience",
  openGraph: {
    title: "Hotel Booking",
    description: "Simple and intuitive hotel booking experience",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking",
    description: "Simple and intuitive hotel booking experience",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <ReduxProvider>
            <Header />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
