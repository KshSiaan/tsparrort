"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ✅ Zod Schema
const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["new_pass"],
    mutationFn: (body: { password: string; password_confirmation: string }) => {
      return resetPasswordApi(body, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      navig.push("/admin/dashboard");
      toast.success(res.message ?? "Successfully updated your password");
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      password: values.newPassword,
      password_confirmation: values.confirmPassword,
    });
  };

  return (
    <Card className="w-[90%] lg:w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>New</span>{" "}
          <span className="relative text-primary">
            Password
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          Secure access to your administration dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Link href="/admin/login" className="text-sm text-muted-foreground">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
