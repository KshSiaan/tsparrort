"use client";
import { getMyOrdersApi } from "@/lib/api/base";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { idk } from "@/lib/utils";

export default function MyOrders() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["my_orders"],
    queryFn: async (): Promise<idk> => {
      return await getMyOrdersApi({ token });
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="text-center text-sm text-muted-foreground py-8">
        No orders found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Ordered Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.orders.map((order: idk) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.order_id}</TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                {order.order_items.map((item: idk) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span>{item.name}</span>
                    <span>
                      x{item.quantity} (${item.price})
                    </span>
                  </div>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <Badge
                variant={
                  order.status === "Completed"
                    ? "default"
                    : order.status === "Pending"
                    ? "outline"
                    : "secondary"
                }
              >
                {order.status}
              </Badge>
            </TableCell>

            <TableCell>
              {new Date(order.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
