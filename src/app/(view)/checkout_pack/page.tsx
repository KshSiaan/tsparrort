"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon, HandPlatterIcon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getProfileApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { checkoutApi } from "@/lib/api/base";
import Confirming from "./confirming";

const checkoutSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  phone_number: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City name too short"),
  state: z.string().min(2, "State name too short"),
  zip_code: z.string().regex(/^\d{4,5}$/, "Invalid ZIP code"),
  country: z.string().min(2, "Country name too short"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface PayloadType extends CheckoutFormData {
  orders: idk[];
}

export default function Page() {
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const [confirming, setConfiming] = useState<boolean>(false);
  const [checkData, setCheckData] = useState<idk | undefined>();
  const [cart, SetCart] = useState<
    | {
        product_name: string;
        product_id: string;
        pack_id: string;
        size: number | string;
        price: number | string;
      }
    | undefined
  >();
  // Fetch profile
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => getProfileApi(token),
    enabled: !!token,
  });
  useEffect(() => {
    const cartDataPuller = localStorage.getItem("packBuy");
    if (cartDataPuller) {
      SetCart(JSON.parse(cartDataPuller));
    }
  }, []);
  // Form setup
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });

  // Prefill form from profile data
  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      form.reset({
        full_name: profile.full_name || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      });
    }
  }, [data, form]);
  //okokokok
  // Checkout mutation
  const { mutate } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (body: PayloadType) => checkoutApi({ body }),
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      console.log(res);
      setCheckData(res.response);
      setConfiming(true);
    },
  });

  const onSubmit = (values: CheckoutFormData) => {
    const payload = {
      ...values,
      orders: [{ product_id: cart?.product_id, pack_id: cart?.pack_id }],
    };
    mutate(payload);
  };

  if (confirming) {
    return (
      <div className="min-h-dvh w-full flex flex-col justify-center items-center">
        <Confirming data={checkData} />
      </div>
    );
  }

  return (
    <main className="min-h-dvh w-full flex flex-col">
      {/* Header */}
      <div className="h-16 w-full px-6 flex justify-start items-center">
        <div className="w-full">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="cursor-pointer"
            onClick={() => navig.back()}
          >
            <ArrowLeftIcon />
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className="w-full p-6 pt-0 grid lg:grid-cols-7 gap-6 flex-1">
        {/* Order Summary */}
        <Card className="lg:col-span-2 border rounded-lg">
          <CardHeader className="border-b">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart && (
              <div className="flex justify-between" key={cart.pack_id}>
                <span>
                  {cart.product_name} x{cart.size}
                </span>
                <span>${cart.price}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${cart?.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card className="lg:col-span-5 border rounded-lg">
          <CardHeader className="border-b">
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <HandPlatterIcon /> Place Order
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
