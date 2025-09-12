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
        <CardTitle className="text-4xl font-semibold tracking-tight">
          Welcome back 👋
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Sign in to continue to{" "}
          <span className="font-medium">The Screaming Parrots</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Label>E-mail</Label>
        <Input />
        <Label>Password</Label>
        <Input />
      </CardContent>
      <div className="flex justify-end items-center px-2">
        <Button className="w-fit" variant="link" asChild>
          <Link href={"/reset"}>Forget your password?</Link>
        </Button>
      </div>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" asChild>
          <Link href="/">Sign in</Link>
        </Button>
        <Button className="w-full" variant={"outline"} asChild>
          <Link href="/register">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
