"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getFeedbacks } from "@/lib/api/base";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: (): idk => {
      return getFeedbacks({ token });
    },
  });
  return (
    <main className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Support Request</CardTitle>
          <CardDescription>
            Click on a card below to view the full details of a user&apos;s
            support request.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            data.data.data.map((x: idk) => (
              <Dialog key={x.id}>
                <DialogTrigger asChild>
                  <Card>
                    <CardHeader>
                      <CardTitle>{x.name}</CardTitle>
                      <CardDescription>
                        From : <strong>{x.email}</strong>
                      </CardDescription>
                      <CardDescription>{x.feedback}</CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Name: {x.name}</DialogTitle>
                  </DialogHeader>
                  {/* <p className="text-lg">
                    Name: <span className="font-semibold">{x.name}</span>
                  </p> */}
                  <p>{x.email}</p>
                  <DialogDescription>{x.feedback}</DialogDescription>
                </DialogContent>
              </Dialog>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  );
}
