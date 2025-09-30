"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBanner, updateBanner } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { toast } from "sonner";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: (): idk => {
      return getBanner();
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["update_banner"],
    mutationFn: (body: FormData) => {
      return updateBanner({ body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated banner!");
    },
  });

  // Set default banner on load
  useEffect(() => {
    if (!isPending && data?.data?.banner) {
      setPreview(data.data.banner); // default image URL
    }
  }, [isPending, data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    const payload = new FormData();

    payload.append("banner", selectedFile);
    mutate(payload);
    console.log("Selected file:", selectedFile);
    // handle actual upload logic here
  };

  return (
    <div className="flex items-center justify-center h-full p-6 bg-gray-50">
      <div className="w-full lg:w-2/5 p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center gap-4">
        <label className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-400">
              Drag & drop an image or click to select
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!selectedFile || isPending} // disable if no new file
        >
          {isPending ? "Updating" : "Upload Banner"}
        </Button>
      </div>
    </div>
  );
}
