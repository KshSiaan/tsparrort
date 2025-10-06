"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { checkCheckoutStatusApi } from "@/lib/api/base";
import { Loader2Icon, CheckCircle, RefreshCcw } from "lucide-react";
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
  const clearedRef = useRef(false);

  // Open Clover popup
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

  // Query payment status (manual trigger)
  const {
    data: status,
    isFetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["checkoutStatus", data?.checkoutSessionId],
    queryFn: (): idk =>
      checkCheckoutStatusApi({ token, id: data?.checkoutSessionId! }),
    enabled: false, // manual check only
  });

  // Clear cart once on confirmed payment
  useEffect(() => {
    if (status?.status === true && !clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [status?.status, clearCart]);

  // Success UI
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

  // Default UI (after popup closed)
  return (
    <Card className="w-full max-w-md mx-auto p-8 text-center shadow-lg border border-muted rounded-2xl space-y-5">
      <h2 className="text-2xl font-semibold">Confirm Payment from Clover</h2>
      <p className="text-gray-600">
        Once you’ve completed payment, click below to verify.
      </p>

      <Button
        onClick={() => refetch({ throwOnError: false })}
        variant="outline"
        disabled={isFetching}
        className="flex items-center gap-2 mx-auto"
      >
        {isFetching ? (
          <>
            <Loader2Icon className="h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <RefreshCcw className="h-4 w-4" />
            Check Payment
          </>
        )}
      </Button>

      {isError && (
        <p className="text-sm text-red-500">Something went wrong. Try again.</p>
      )}
    </Card>
  );
}
