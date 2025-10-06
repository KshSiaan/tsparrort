import Navbar from "@/components/core/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doogoo - Authenticate",
  description: "DOGOO Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="h-dvh w-dvw flex justify-center items-center">
        {children}
      </main>
    </>
  );
}
