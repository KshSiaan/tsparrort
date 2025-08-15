import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "The Screaming Parrots Cafe – Desserts, Tea & Bites in Redmond, WA",
  description:
    "The Screaming Parrots Cafe in Redmond, WA — serving late-night crepes, souffle pancakes, onigiri, tea, coffee & bakery treats",
  openGraph: {
    title: "The Screaming Parrots Cafe",
    description:
      "Desserts, tea, crepes, and bites open until late in Redmond, WA.",
    url: "https://www.thescreamingparrotscafe.com",
    siteName: "The Screaming Parrots Cafe",
    images: [
      {
        url: "https://www.thescreamingparrotscafe.com/og-image.jpg",
        width: 1200,
        height: 628,
        alt: "Desserts and drinks at The Screaming Parrots Cafe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Screaming Parrots Cafe – Late-Night Desserts in Redmond, WA",
    description: "Crepes, souffle pancakes, onigiri, tea, coffee & more.",
    images: ["https://www.thescreamingparrotscafe.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
