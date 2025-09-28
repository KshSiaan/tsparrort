import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { idk } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { createCategoriesApi } from "@/lib/api/admin";
import { toast } from "sonner";
export default function EditCat({ x }: { x: idk }) {
  const qcl = useQueryClient();
  const [cat, setCat] = useState<string>("");
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_cat"],
    mutationFn: () => {
      return createCategoriesApi({ body: { name: cat }, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["category"] });
      setCat("");
      toast.success(res.message ?? "Successfully created category");
    },
  });
  const onAdd = () => {
    mutate();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {x.name}</DialogTitle>
        </DialogHeader>
        <div className="">
          <Label>Category name:</Label>
          <Input
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
