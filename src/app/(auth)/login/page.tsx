"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// ✅ Zod schema
const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Page() {
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginApi({ email, password });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      console.log(res);
      setCookie("token", res.token);
      navig.push("/profile");
      toast.success(res.message ?? "Successfully logged in!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Card className="w-[90%] lg:w-[40dvw] h-auto">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-4xl font-semibold tracking-tight">
          Welcome back 👋
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Sign in to continue to{" "}
          <span className="font-medium">The Screaming Parrots</span>
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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
          </CardContent>

          <div className="flex justify-end items-center px-2">
            <Button className="w-fit" variant="link" asChild>
              <Link href="/reset">Forgot your password?</Link>
            </Button>
          </div>

          <CardFooter className="flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Singing in.." : "Sign in"}
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
