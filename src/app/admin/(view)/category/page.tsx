"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { deleteCategoriesApi, getCategoriesApi } from "@/lib/api/admin";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useCookies } from "react-cookie";
import AddCat from "./add-cat";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import EditCat from "./edit-cat";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, refetch, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: (): idk => {
      return getCategoriesApi(token);
    },
  });
  const { mutate: deleteCat, isPending: deleting } = useMutation({
    mutationKey: ["deleteCat"],
    mutationFn: (id: string) => {
      return deleteCategoriesApi({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully removed Cateogry");
      refetch();
    },
  });
  return (
    <div className="h-full w-full p-6">
      <AddCat />
      <div className="grid grid-cols-5 gap-6 mt-6">
        {isPending ? (
          <>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <Skeleton className="w-full aspect-[4/1]" key={i} />
              ))}
          </>
        ) : (
          data?.data?.map((x: { name: string; id: string }) => (
            <Card key={x.id}>
              <CardHeader className="flex justify-center items-center">
                <CardTitle>{x.name}</CardTitle>
              </CardHeader>
              <CardFooter className="grid grid-cols-2 gap-2">
                <EditCat x={x} />
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => {
                    deleteCat(x.id);
                  }}
                >
                  {deleting ? <Loader2 /> : "Delete"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
