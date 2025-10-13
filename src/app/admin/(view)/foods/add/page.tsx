"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { Editor } from "primereact/editor";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFood, getCategoriesApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// schema — images excluded
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Please select a category"),
  pricePerServing: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  pack1_size: z.string().optional(),
  pack1_price: z.string().optional(),
  pack2_size: z.string().optional(),
  pack2_price: z.string().optional(),
  pack3_size: z.string().optional(),
  pack3_price: z.string().optional(),
  additionalDescription: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function Page() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [{ token }] = useCookies(["token"]);
  const navig = useRouter();
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: (): idk => {
      return getCategoriesApi();
    },
  });
  const { mutate, isPending: adding } = useMutation({
    mutationKey: ["add_food"],
    mutationFn: (body: FormData) => {
      return addFood({ body, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["foods"] });
      toast.success(res.message ?? "Successfully created the product!");
    },
  });

  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      return;
    }
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      pricePerServing: "",
      description: "",
      pack1_size: "",
      pack1_price: "",
      pack2_size: "",
      pack2_price: "",
      pack3_size: "",
      pack3_price: "",
      additionalDescription: "",
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    // image validation outside zod
    if (files.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    // optional: enforce file size (example: max 5MB)
    // const oversized = files.find((f) => f.size > 20 * 1024 * 1024);
    // if (oversized) {
    //   toast.error(`${oversized.name} is larger than 5MB`);
    //   return;
    // }

    // console.log("form values:", values);
    // console.log("image files:", files);

    const payload = new FormData();

    payload.append("name", values.name);
    payload.append("category", values.category);
    payload.append("price", values.pricePerServing);
    payload.append("description", values.description);

    if (values.additionalDescription) {
      payload.append("additional_description", values.additionalDescription);
    }

    // packs
    const packs: { pack_size: string; price: string }[] = [];

    for (let i = 1; i <= 3; i++) {
      const size = values[`pack${i}_size` as keyof typeof values] as string;
      const price = values[`pack${i}_price` as keyof typeof values] as string;
      if (size && price) {
        packs.push({ pack_size: size, price });
      }
    }

    payload.append("packs", JSON.stringify(packs));

    files.forEach((file, index) => {
      payload.append(`images[${index}]`, file);
    });

    mutate(payload);
  };

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length) {
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  return (
    <section className="p-6 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <label
            className={`cursor-pointer border-dashed border-2 hover:bg-secondary/50 flex flex-col justify-center items-center gap-4 text-muted-foreground rounded-lg
            min-h-[300px] w-full transition-all duration-200 ${
              dragging ? "border-primary bg-primary/10" : "border-primary"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center p-4">
                {previews.map((src, idx) => (
                  <Image
                    key={idx}
                    height={120}
                    width={120}
                    src={src}
                    alt={`Preview ${idx}`}
                    className="object-contain size-[120px] rounded-md border"
                  />
                ))}
              </div>
            ) : (
              <>
                <UploadIcon className="w-10 h-10" />
                <h4 className="text-xl font-medium">Select Product Images</h4>
                <p className="text-sm text-center">
                  You can upload multiple images
                  {/* (max 20MB each) */}
                </p>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) =>
                e.target.files &&
                setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
              }
            />
          </label>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {!isPending && (
            <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
              <code className="whitespace-pre-wrap">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          )} */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {!isPending &&
                        data?.data?.map((x: idk) => (
                          <SelectItem value={x.name} key={x.id}>
                            {x.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerServing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price (per serving)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-[120px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full grid grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FormField
                  control={form.control}
                  name="pack1_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pack size</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="pack1_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FormField
                  control={form.control}
                  name="pack2_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pack size</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="pack2_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FormField
                  control={form.control}
                  name="pack3_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pack size</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="pack3_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Additional Description (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="pb-12">
              <FormField
                control={form.control}
                name="additionalDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        style={{ minHeight: "200px" }}
                        value={field.value}
                        onTextChange={(e) => field.onChange(e.htmlValue)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Add item"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
