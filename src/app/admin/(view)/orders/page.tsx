import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Orders from "./orders";

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
            <Orders />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
