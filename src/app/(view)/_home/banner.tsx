"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getBanner } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Banner() {
  const { data, isPending, isError } = useQuery({
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
      <div className="w-full h-[50dvh] bg-secondary bg-cover bg-center"></div>
    );
  }
  return (
    <div
      className="w-full h-[50dvh] bg-secondary bg-cover bg-center"
      style={{ backgroundImage: `url('${data?.data?.banner}')` }}
    ></div>
  );
}
