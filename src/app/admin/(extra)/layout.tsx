import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TSP Admin",
  description: "TSP Admin Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-dvh w-dvw flex justify-center items-center bg-primary">
      {children}
    </main>
  );
}
