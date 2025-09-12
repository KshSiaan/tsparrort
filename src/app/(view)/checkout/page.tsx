"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { ArrowLeftIcon, HandPlatterIcon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const navig = useRouter();
  const { cart } = useCart();
  console.log(cart);

  return (
    <main className="min-h-dvh w-full">
      {/* Order Summary */}
      <div className="h-16 w-full px-6 flex justify-start items-center">
        <div className="w-full">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="cursor-pointer"
            onClick={() => {
              navig.back();
            }}
          >
            <ArrowLeftIcon />
          </Button>
        </div>
      </div>
      <div className="w-full p-6 pt-0 grid lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-2 border rounded-lg">
          <CardHeader className="border-b">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((x) => (
              <div className="flex justify-between" key={x.id}>
                <span>
                  {x.name} x{x.quantity}
                </span>
                <span>${x.price * x.quantity}</span>
              </div>
            ))}

            {/* Calculate total dynamically */}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>
                $
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card className="lg:col-span-5 border rounded-lg">
          <CardHeader className="border-b">
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Shipping Info */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="10001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="USA" />
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href={"/checkout/success"}>
                <HandPlatterIcon /> Place Order
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
