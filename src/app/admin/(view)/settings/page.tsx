import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export default function Page() {
  return (
    <main className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Support Request</CardTitle>
          <CardDescription>
            Click on a card below to view the full details of a user&apos;s
            support request.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-6">
          {Array(9)
            .fill("")
            .map((_, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <Card>
                    <CardHeader>
                      <CardTitle>Minor issue with order</CardTitle>
                      <CardDescription>
                        From : <strong>example@gmail.com</strong>
                      </CardDescription>
                      <CardDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ipsum illum quia facere...
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Minor issue with order</DialogTitle>
                  </DialogHeader>
                  <p className="text-lg">
                    Name: <span className="font-semibold">Jane Doe</span>
                  </p> 
                  <p>Email: example@gmail.com</p>
                  <DialogDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam enim perspiciatis, odit explicabo recusandae quam
                    ad debitis totam laborum unde, pariatur iure esse maxime
                    voluptatem magnam voluptates quas ab ipsum.
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}
