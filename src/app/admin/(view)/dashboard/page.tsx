"use client";
import React, { useState } from "react";
import { SectionCards } from "@/components/section-cards";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getDashboard } from "@/lib/api/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { idk } from "@/lib/utils";

type Order = {
  id?: number;
  created_at?: string;
  customer_name?: string;
  status?: string;
};

type OrdersResponse = {
  current_page: number;
  data: Order[];
  last_page: number;
  per_page: number;
  total: number;
};

type Props = {
  data: {
    status: boolean;
    message: string;
    data: {
      total_users: number;
      pending_orders: number;
      completed_order: number;
      total_revenue: number;
      orders: OrdersResponse;
    };
  };
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: (): idk => getDashboard(token),
  });

  return (
    <div className="p-6 flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {isPending ? (
          <div className="w-full grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-[3/1]" />
            ))}
          </div>
        ) : (
          <>
            <SectionCards data={data} />
            <RecentOrders data={data} />
          </>
        )}
      </div>
    </div>
  );
}

const RecentOrders = ({ data }: Props) => {
  const orders = data?.data?.orders;
  const [page, setPage] = useState(orders?.current_page ?? 1);

  return (
    <section>
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Orders</h3>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Customer</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.data?.length > 0 ? (
                orders.data.map((order, i) => (
                  <TableRow key={order.id ?? i}>
                    <TableCell className="text-center">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.customer_name ?? "Unknown"}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {order.status ?? "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-end gap-2 items-center mt-4">
            <Button
              size="sm"
              className="text-sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="text-sm font-semibold">
              Page {orders?.current_page ?? 1} of {orders?.last_page ?? 1}
            </span>
            <Button
              size="sm"
              className="text-sm"
              disabled={page >= (orders?.last_page ?? 1)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
