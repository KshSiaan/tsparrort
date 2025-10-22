"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { Editor } from "primereact/editor";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAboutApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { getAboutApi } from "@/lib/api/base";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [tit, setTit] = useState("");
  const [text, setText] = useState<idk>("");
  const { data, isPending: aboutLoading }: idk = useQuery({
    queryKey: ["about"],
    queryFn: getAboutApi,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["about_update"],
    mutationFn: () => {
      return updateAboutApi({ body: { title: tit, content: text }, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  useEffect(() => {
    if (!aboutLoading) {
      setText(data?.data?.content ?? "");
      setTit(data?.data?.title ?? "");
    }
  }, [aboutLoading]);
  return (
    <main className="p-6 space-y-6">
      <h3 className="text-2xl font-bold">
        Customize the about us page from here
      </h3>
      <Label>Title</Label>
      <Input
        className="border-foreground/30 shadow-none! rounded-none!"
        value={tit}
        onChange={(e) => {
          setTit(e.target.value);
        }}
      />
      <Label>Content</Label>
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: "320px" }}
      />
      <Button
        onClick={() => {
          mutate();
        }}
      >
        Save this content
      </Button>
    </main>
  );
}
