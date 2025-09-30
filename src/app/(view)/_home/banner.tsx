"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getBanner } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Banner() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["banner"],
    queryFn: (): idk => {
      return getBanner();
    },
  });
  if (isPending) {
    return <Skeleton className="w-full h-[50dvh]" />;
  }
  if (isError) {
    return (
      <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
        <code className="whitespace-pre-wrap">
          {JSON.stringify(error, null, 2)}
        </code>
      </pre>
    );
  }
  return (
    <div
      className="w-full h-[50dvh] bg-secondary bg-cover bg-center bg"
      style={{ backgroundImage: `url('${data?.data?.banner}')` }}
    ></div>
  );
}
