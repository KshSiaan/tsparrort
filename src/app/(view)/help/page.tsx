import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-dvh p-6 space-y-12">
      <h1 className="text-center text-4xl font-bold">Help & Support</h1>

      {/* Contact Support Section */}
      {/* <Card className="w-full lg:w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Having trouble? Reach us directly through any of the options below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            Email:{" "}
            <a
              href="mailto:support@example.com"
              className="text-primary underline"
            >
              support@example.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-primary underline">
              +1 234 567 890
            </a>
          </p>
        </CardContent>
      </Card> */}

      {/* Feedback Form Section */}
      <Card className="w-full lg:w-2/3 mx-auto">
        <CardHeader>
          <CardTitle>Send Feedback</CardTitle>
          <CardDescription>
            Share your thoughts with us. We’d love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Textarea
            placeholder="Your Message or Feedback"
            className="min-h-[120px]"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit Feedback</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
