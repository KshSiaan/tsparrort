import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EllipsisIcon, EyeIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  return (
    <main className="py-6 p-6">
      <section className="">
        <Card>
          <CardHeader className="w-full flex flex-col gap-3 border-b md:flex-row md:items-center md:justify-between">
            <CardTitle>Order Management</CardTitle>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full lg:justify-end">
              {/* Search */}
              <div
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full sm:w-64 rounded-md border bg-transparent px-3 items-center text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
              >
                <SearchIcon className="text-muted-foreground mr-2 shrink-0" />
                <Input
                  className="flex-1 outline-none border-none ring-0 shadow-none py-0"
                  placeholder="Search.."
                />
              </div>
              {/* Filter */}
              <Select defaultValue="pending">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <Users />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const Users = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>#{i + 1001}</TableCell>
              <TableCell>Liam Nickson</TableCell>
              <TableCell>$345</TableCell>
              <TableCell>
                <Badge variant={"success"}>Completed</Badge>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <EyeIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order details</DialogTitle>
                    </DialogHeader>
                    <div className="w-full p-4 space-y-2">
                      <p>Order ID: #3000</p>
                      <p>Customer Name: AB Smith</p>
                      <p>Price: $12.50</p>
                      <p className="font-semibold">Item:</p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Pizza</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>$250</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="">$250.00</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <EllipsisIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="border-b pb-4">
                      <DialogTitle>Change Order Status</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-4">
                      <p>Current Status:</p>{" "}
                      <Badge variant={"secondary"}>Pending</Badge>
                    </div>
                    <div className="">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button size={"sm"} className="text-sm">
                        Confirm Status
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
