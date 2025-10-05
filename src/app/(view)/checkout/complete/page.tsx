"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
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
    </main>
  );
}
