"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { Editor } from "primereact/editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { getFoodbyId, updateFoodById } from "@/lib/api/admin";
import { idk } from "@/lib/utils";

export default function Page({ id }: { id: string }) {
  const [{ token }] = useCookies(["token"]);

  // Drag & Drop / File states
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [packs, setPacks] = useState<{ pack_size?: string; price?: string }[]>([
    { pack_size: "", price: "" },
    { pack_size: "", price: "" },
    { pack_size: "", price: "" },
  ]);
  const [additionalDesc, setAdditionalDesc] = useState("");

  // Fetch food data
  const { data } = useQuery({
    queryKey: ["view_food", id],
    queryFn: (): idk => getFoodbyId({ id }),
    enabled: !!id,
  });

  // Populate form when data is ready
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPrice(data.data.price || "");
      setDescription(data.data.description || "");
      setAdditionalDesc(data.data.additional_description || "");
      setPacks(
        data.data.packs?.length
          ? data.data.packs.map((p: idk) => ({
              pack_size: p.pack_size || "",
              price: p.price || "",
            }))
          : packs
      );
      if (data.data.images?.length) {
        setPreviews(data.data.images); // show existing images
      }
    }
  }, [data]);

  // Preview uploaded files
  useEffect(() => {
    if (!files.length) return;

    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (droppedFiles.length) setFiles(droppedFiles);
  };

  // Update food mutation
  const { mutate, isPending: loading } = useMutation({
    mutationKey: ["update_food"],
    mutationFn: (body: FormData) => updateFoodById({ id, token, body }),
    onError: (err: any) => toast.error(err.message ?? "Failed to update food"),
    onSuccess: (res: idk) =>
      toast.success(res.message ?? "Food updated successfully!"),
  });

  const handleSubmit = () => {
    if (!name || !price || !description) {
      toast.error("Please fill all required fields.");
      return;
    }

    // if (!files.length) {
    //   toast.error("At least one product image is required.");
    //   return;
    // }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("price", price);
    payload.append("description", description);
    payload.append("additional_description", additionalDesc);
    payload.append(
      "packs",
      JSON.stringify(packs.filter((p) => p.pack_size && p.price))
    );

    if (files.length > 0) {
      files.forEach((file, idx) => payload.append(`images[${idx}]`, file));
    }
    payload.append("_method", "PATCH");
    mutate(payload);
  };

  return (
    <section className="p-6 space-y-6">
      {/* Image Upload */}
      <label
        className={`cursor-pointer border-dashed border-2 hover:bg-secondary/50 flex flex-col justify-center items-center gap-4 text-muted-foreground rounded-lg
        min-h-[300px] w-full transition-all duration-200 ${
          dragging ? "border-primary bg-primary/10" : "border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previews.length ? (
          <div className="grid grid-cols-3 gap-4 p-4 w-full">
            {previews.map((src, i) => (
              <Image
                key={i}
                height={200}
                width={200}
                src={src}
                alt={`Preview ${i}`}
                className="object-contain rounded-lg border mx-auto"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-10">
            <UploadIcon className="w-10 h-10" />
            <h4 className="text-xl font-medium">Select Product Images</h4>
            <p className="text-sm text-center">
              Image size should be max 5MB each
            </p>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
      </label>

      {/* Product name */}
      <div className="space-y-2">
        <Label>Product name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* Product price */}
      <div className="space-y-2">
        <Label>Product price (per serving)</Label>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Product Description</Label>
        <Textarea
          className="h-[300px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Packs */}
      <div className="w-full grid grid-cols-3 gap-6">
        {packs.map((p, i) => (
          <Card key={i}>
            <CardHeader>
              <Label>Pack size</Label>
              <Input
                value={p.pack_size}
                onChange={(e) => {
                  const newPacks = [...packs];
                  newPacks[i].pack_size = e.target.value;
                  setPacks(newPacks);
                }}
              />
            </CardHeader>
            <CardContent className="space-y-2">
              <Label>Price</Label>
              <Input
                value={p.price}
                onChange={(e) => {
                  const newPacks = [...packs];
                  newPacks[i].price = e.target.value;
                  setPacks(newPacks);
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional description */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Description (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Editor
            style={{ minHeight: "300px" }}
            value={additionalDesc}
            onTextChange={(e) => setAdditionalDesc(e.htmlValue!)}
          />
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Update Food"}
      </Button>
    </section>
  );
}
