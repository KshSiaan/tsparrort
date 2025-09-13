import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
    <main className="min-h-dvh w-full flex justify-center items-center">
      <Card className="w-[40dvw] h-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Full name</Label>
          <Input />
          <Label>E-mail</Label>
          <Input />
          <Label>Phone number</Label>
          <Input />
        </CardContent>
        <CardFooter className="flex-col gap-4 border-t">
          <Button className="w-full" asChild>
            <Link href="/">Save Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
