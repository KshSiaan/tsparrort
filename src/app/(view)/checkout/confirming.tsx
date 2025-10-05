"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { checkCheckoutStatusApi } from "@/lib/api/base";
import { Loader2Icon, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { idk } from "@/lib/utils";

export default function Confirming({
  data,
}: {
  data?: {
    href: string;
    checkoutSessionId: string;
    expirationTime: string;
    createdTime: string;
  };
}) {
  const { clearCart } = useCart();
  const [{ token }] = useCookies(["token"]);
  const [popupClosed, setPopupClosed] = useState(false);
  const clearedRef = useRef(false); // ensures cart is cleared only once

  // 1️⃣ Open Clover popup
  useEffect(() => {
    if (!data?.href) return;

    const popup = window.open(data.href, "_blank", "width=500,height=700");

    const interval = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(interval);
        setPopupClosed(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [data?.href]);

  // 2️⃣ Poll backend for payment status
  const {
    data: status,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["checkoutStatus", data?.checkoutSessionId],
    queryFn: (): idk =>
      checkCheckoutStatusApi({ token, id: data?.checkoutSessionId! }),
    enabled: !!data?.checkoutSessionId && popupClosed,
    refetchInterval: 3000,
  });

  // 3️⃣ Clear cart once when payment confirmed
  useEffect(() => {
    if (status?.status === true && !clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [status?.status, clearCart]);

  // 4️⃣ Loading / verifying payment
  if (!popupClosed || isPending || status?.status === false) {
    return (
      <Card className="w-full max-w-md mx-auto p-8 flex flex-col items-center text-center space-y-4 shadow-lg border border-muted rounded-2xl animate-pulse">
        <div className="relative">
          <Loader2Icon className="h-12 w-12 text-primary animate-spin mx-auto" />
          <Clock className="h-6 w-6 text-yellow-500 absolute -bottom-2 -right-2 animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold">Confirming Your Payment...</h2>
        <p className="text-gray-600">
          Please wait a moment while we verify your transaction.
          <br />
          <span className="text-sm text-gray-500">
            This may take up to a few seconds.
          </span>
        </p>
      </Card>
    );
  }

  // 5️⃣ Error handling
  if (isError) {
    return (
      <p className="text-center text-red-500">
        Something went wrong. Try again.
      </p>
    );
  }

  // 6️⃣ Success UI
  if (status?.status === true) {
    return (
      <Card className="w-full max-w-lg p-8 shadow-xl border-t-4 border-primary rounded-2xl text-center">
        <CheckCircle className="mx-auto mb-4 text-primary" size={56} />
        <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been successfully placed and confirmed.
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="w-full"
          variant="default"
        >
          Continue Shopping
        </Button>
      </Card>
    );
  }

  // fallback
  return null;
}
