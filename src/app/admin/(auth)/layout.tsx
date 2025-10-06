import { getProfileApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Doogoo",
  description: "DOGOO Login",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    const profileData: idk = await getProfileApi(token);
    if (profileData.data.role === "ADMIN") {
      return redirect("/admin/dashboard");
    } else {
      return notFound();
    }
  }
  return (
    <main className="h-dvh w-dvw flex justify-center items-center bg-primary">
      {children}
    </main>
  );
}
