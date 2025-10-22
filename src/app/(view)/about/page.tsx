"use client";
import { getAboutApi } from "@/lib/api/base";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import DOMPurify from "dompurify";

export default function Page() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["about"],
    queryFn: getAboutApi,
  });

  if (isPending) {
    return (
      <div className="min-h-dvh flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(data?.data?.content || "");

  return (
    <main className="p-6">
      <section className="min-h-dvh w-full lg:w-2/3 mx-auto">
        <h1 className="text-4xl text-center font-bold">{data?.data?.title}</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </section>
    </main>
  );
}
