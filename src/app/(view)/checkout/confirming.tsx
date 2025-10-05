"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { checkCheckoutStatusApi } from "@/lib/api/base";
import { Loader2Icon, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { idk } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

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
  const router = useRouter();
  useEffect(() => {
    if (data?.href) {
      router.push(data.href);
      clearCart();
    }
  }, [data]);
  const {
    data: status,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["checkoutStatus", data?.checkoutSessionId],
    queryFn: (): idk =>
      checkCheckoutStatusApi({ token, id: data?.checkoutSessionId! }),
    enabled: !!data?.checkoutSessionId,
    refetchInterval: 3000,
  });

  // loading / verifying payment state
  if (isPending || status?.status === false) {
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

  // error handling
  if (isError) {
    return (
      <p className="text-center text-red-500">
        Something went wrong. Try again.
      </p>
    );
  }

  // success UI
  return (
    <Card className="w-full max-w-lg p-8 shadow-xl border-t-4 border-primary rounded-2xl text-center">
      <CheckCircle className="mx-auto mb-4 text-primary" size={56} />
      <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been successfully placed and is currently{" "}
        <span className="font-semibold text-yellow-600">Pending</span>.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="w-full"
        variant="default"
      >
        Continue Shopping
      </Button>
    </Card>
  );
}
