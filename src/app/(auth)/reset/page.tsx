"use client";
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
import { Label } from "@/components/ui/label";
import { forgotPasswordApi } from "@/lib/api/auth";
import { idk } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [val, setVal] = useState("");
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot_pass"],
    mutationFn: () => {
      return forgotPasswordApi({ email: val });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Verify your OTP sent to email!");
      navig.push("/admin/verify-otp");
    },
  });
  return (
    <Card className="w-[90%] lg:w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Reset</span>{" "}
          <span className="relative text-primary">
            Password
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          We&apos;ll send a verification code to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>E-mail</Label>
        <Input
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() => {
            mutate();
          }}
        >
          Send Verification Code
        </Button>
      </CardFooter>
    </Card>
  );
}
