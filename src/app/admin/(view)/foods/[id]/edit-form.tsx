"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function EditForm({ id }: { id: string | undefined }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  // Create a preview URL when file changes
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up URL when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  if (!id) {
    return notFound();
  }

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
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <section className="p-6 space-y-6">
      <label
        className={`cursor-pointer border-dashed border-2 hover:bg-secondary/50 flex flex-col justify-center items-center gap-4 text-muted-foreground rounded-lg
        h-[300px] w-full transition-all duration-200 ${
          dragging ? "border-primary bg-primary/10" : "border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <Image
            height={200}
            width={200}
            src={preview}
            alt="Preview"
            className="max-h-full object-contain size-[200px]"
          />
        ) : (
          <>
            <UploadIcon className="w-10 h-10" />
            <h4 className="text-xl font-medium">Select Product Image</h4>
            <p className="text-sm text-center">Image size should be max 5MB</p>
          </>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
      </label>
      <div className="space-y-2">
        <Label>Product name</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Label>Product price (per serving)</Label>
        <Input />
      </div>
      <div className="space-y-2">
        <Label>Product Description</Label>
        <Textarea className="h-[300px]" />
      </div>
      <div className="">
        <Button>Add item</Button>
      </div>
    </section>
  );
}
