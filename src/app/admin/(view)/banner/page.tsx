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
  const [mounted, setMounted] = useState(false); // ✅ hydration guard
  const [{ token }] = useCookies(["token"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: (): idk => getBanner(),
    enabled: mounted, // ✅ only run query after mount
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationKey: ["update_banner"],
    mutationFn: (body: FormData) => updateBanner({ body, token }),
    onError: (err: idk) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated banner!");
    },
  });

  // Set default banner on load
  useEffect(() => {
    if (mounted && !isPending && data?.data?.banner) {
      setPreview(data.data.banner);
    }
  }, [mounted, isPending, data]);

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
  };

  if (!mounted) {
    // ✅ Prevent hydration mismatch
    return (
      <div className="flex items-center justify-center h-full p-6 bg-gray-50">
        <div className="w-full lg:w-2/5 p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center gap-4">
          <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-6 bg-gray-50">
      <div className="w-full lg:w-2/5 p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center gap-4">
        <label htmlFor="image">Image:</label>
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
          disabled={!selectedFile || isMutating}
        >
          {isMutating ? "Updating..." : "Upload Banner"}
        </Button>
      </div>
    </div>
  );
}
