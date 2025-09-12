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
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-5xl font-bold flex items-center gap-3 w-full justify-center">
          <span>Create</span>{" "}
          <span className="relative text-primary">
            Account
            <div className="w-full absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-primary to-[#FFFFFF]" />
          </span>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Register as a new user in
          <span className="font-medium pl-1">The Screaming Parrots</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Label>Full name</Label>
        <Input />
        <Label>E-mail</Label>
        <Input />
        <Label>Phone number (Optional)</Label>
        <Input />
        <Label>Password</Label>
        <Input />
        <Label>Confirm Password</Label>
        <Input />
      </CardContent>
      <CardFooter className="flex-col gap-4 border-t">
        <Button className="w-full" variant={"outline"} asChild>
          <Link href="/">Create account</Link>
        </Button>
        <Button className="w-full" asChild>
          <Link href="/login">Already have account</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
