import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoriesApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
export default function AddCat() {
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
    <Card>
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label>Category name:</Label>
        <Input
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
          }}
        />
      </CardContent>
      <CardFooter>
        <Button
          size={"sm"}
          className="text-sm! cursor-pointer"
          disabled={isPending}
          onClick={onAdd}
        >
          {isPending ? "Creating" : "Add category"}
        </Button>
      </CardFooter>
    </Card>
  );
}
