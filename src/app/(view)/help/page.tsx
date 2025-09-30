"use client";

import * as React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { createFeedbackApi } from "@/lib/api/base";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

// Zod Schema
const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  feedback: z.string().min(5, "Feedback must be at least 5 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_feedback"],
    mutationFn: ({
      name,
      email,
      feedback,
    }: {
      name: string;
      email: string;
      feedback: string;
    }) => {
      return createFeedbackApi({ body: { name, email, feedback }, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successully submitted feedback!");
    },
  });

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  function onSubmit(values: FeedbackFormValues) {
    mutate(values);
  }

  return (
    <main className="min-h-dvh p-6 space-y-12">
      <h1 className="text-center text-4xl font-bold">Help & Support</h1>

      <Card className="w-full lg:w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Send Feedback</CardTitle>
          <CardDescription>
            Share your thoughts with us. We’d love to hear from you!
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feedback */}
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message or Feedback"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="mt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || !token}
              >
                {isPending
                  ? "Submitting.."
                  : !token
                  ? "Log in Required"
                  : "Submit Feedback"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
