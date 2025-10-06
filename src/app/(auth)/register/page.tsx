"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Zod schema
const createAccountSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\+?[0-9]{7,15}$/.test(v), {
      message: "Invalid phone number",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

type CreateAccountFormValues = z.infer<typeof createAccountSchema>;

export default function Page() {
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (body: {
      full_name: string;
      email: string;
      phone_number: string | undefined;
      password: string;
      password_confirmation: string;
    }) => {
      return registerApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      navig.push(`/verify-otp`);
      toast.success(res.message ?? "Success!");
    },
  });

  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: CreateAccountFormValues) => {
    console.log("submit", values);
    const payload = {
      full_name: values.fullName,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };
    mutate(payload);
  };

  return (
    <Card className="w-[90%] lg:w-[40dvw] h-auto">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Create</span>
          <span className="relative text-primary">
            Account
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Register as a new user in
          <span className="font-medium pl-1">The Screaming Parrots</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="you@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex-col gap-4 border-t p-0">
              <div className="w-full">
                <Button
                  className="w-full cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Creating account..." : "Create account"}
                </Button>
              </div>

              <div className="w-full">
                <Button className="w-full" variant={"ghost"} asChild>
                  <Link href="/login">Already have account</Link>
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
