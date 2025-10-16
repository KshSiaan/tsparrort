"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { customCheckoutApi } from "@/lib/api/base";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

// ✅ Schema
const checkoutSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name too short"),
  state: z.string().min(2, "State name too short"),
  zip_code: z.string().regex(/^\d{4,5}$/, "Invalid ZIP code"),
  country: z.string().min(2, "Country name too short"),
  description: z.string().min(1, "Description is required"),
  date: z.date(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [confirm, setConfirm] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (body: CheckoutFormValues) => customCheckoutApi({ body }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Request sent successfully");
      console.log(res);
      setConfirm(true);
    },
  });
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      description: "",
      date: new Date(),
    },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const response = {
      ...values,
      date: date ? date.toISOString() : "No date selected",
    };
    mutate(response as idk);
  };

  // ✅ Success UI
  if (confirm) {
    return (
      <div className="h-dvh w-dvw flex justify-center items-center">
        <Card className="w-full max-w-lg p-8 shadow-xl border-t-4 border-primary rounded-2xl text-center">
          <CheckCircle className="mx-auto mb-4 text-primary" size={56} />
          <h1 className="text-3xl font-bold mb-2">
            Order request sent for following date
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your reuqest has been successfully placed and confirmed.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full"
            variant="default"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <main className="p-4 lg:p-12 flex justify-center items-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl">
            Custom Order Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Grid for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+8801XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="House, Street, Area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="1207" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Bangladesh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Calendar Field */}
              <div className="flex flex-col gap-2">
                <FormLabel>Pick a Date</FormLabel>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    form.setValue("date", selectedDate as Date);
                  }}
                  disabled={{
                    before: new Date(),
                  }}
                  className="rounded-md border shadow-sm w-fit mx-auto"
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write about your order..."
                        className="resize-none h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
