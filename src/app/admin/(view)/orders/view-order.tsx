"use client";
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
import { useQuery } from "@tanstack/react-query";
import { getViewOrderApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";

export default function ViewOrder({ id }: { id: string | number }) {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["view_order", id],
    queryFn: (): idk => getViewOrderApi({ id, token }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (isError || !data?.status || !data?.order) {
    return (
      <div className="text-center text-sm text-red-500">
        Failed to load order details.
      </div>
    );
  }

  const order = data.order;
  const meta = order.metadata;
  const items = order.order_items || [];

  // Calculate total price dynamically (handle cents properly)
  const total = items.reduce(
    (sum: number, item: { price: any; quantity: any }) => {
      const priceInDollars = Number.parseFloat(item.price) / 100 || 0; // convert cents → dollars
      const quantity = Number.parseInt(item.quantity) || 0;
      return sum + priceInDollars * quantity;
    },
    0
  );

  return (
    <div className="w-full p-4 space-y-3">
      <div className="space-y-1">
        <p>
          <span className="font-medium">Order ID:</span> #{order.order_id}
        </p>
        <p>
          <span className="font-medium">Customer Name:</span> {meta?.full_name}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {meta?.phone_number}
        </p>
        <p>
          <span className="font-medium">Address:</span>{" "}
          {`${meta?.address}, ${meta?.city}, ${meta?.state}, ${meta?.zip_code}, ${meta?.country}`}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`${
              order.status === "Pending"
                ? "text-yellow-600"
                : order.status === "Completed"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>

      <div>
        <p className="font-semibold mt-4 mb-2">Items:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item: idk) => {
              const priceInDollars = Number.parseFloat(item.price) / 100 || 0;
              const quantity = Number.parseInt(item.quantity) || 0;
              const itemTotal = priceInDollars * quantity;

              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>${priceInDollars.toFixed(2)}</TableCell>
                  <TableCell>${itemTotal.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
                Total
              </TableCell>
              <TableCell className="font-semibold">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
