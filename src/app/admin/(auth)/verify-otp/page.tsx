"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const [otp, setOtp] = useState("");
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["forgot_pass"],
    mutationFn: () => {
      return verifyOtpApi({ otp });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      console.log(res);
      setCookie("token", res.access_token);
      navig.push("/admin/new-pass");
      toast.success(res.message ?? "Verify your OTP sent to email!");
    },
  });
  const handleVerify = () => {
    mutate();
  };

  return (
    <Card className="w-[90%] lg:w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Verify</span>{" "}
          <span className="relative text-primary">
            Identity
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex items-center justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onClick={handleVerify}>
          Verify Code
        </Button>
      </CardFooter>
    </Card>
  );
}
