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
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <Card className="w-[40dvw] h-auto">
      <CardHeader>
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>New</span>{" "}
          <span className="relative text-primary">
            Password
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-center text-xl">
          Secure access to your administration dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label>New Password</Label>
        <Input />
        <Label>Confirm Password</Label>
        <Input />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" asChild>
          <Link href="/login">Reset Password</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
