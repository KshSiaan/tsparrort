"use client";
import React from "react";
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
import { idk } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  full_name: string;
  role: string;
  email: string;
  status: string;
  created_at: string;
};

type UsersResponse = {
  current_page: number;
  data: User[];
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
      users: UsersResponse;
    };
  };
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: (): idk => {
      return getDashboard(token);
    },
  });
  return (
    <div className="p-6 pt-0! flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mt-0!">
        {isPending ? (
          <div className="w-full grid grid-cols-4 gap-6">
            <Skeleton className="w-full aspect-[3/1]" />
            <Skeleton className="w-full aspect-[3/1]" />
            <Skeleton className="w-full aspect-[3/1]" />
            <Skeleton className="w-full aspect-[3/1]" />
            <Skeleton className="w-full aspect-[3/1]" />
          </div>
        ) : (
          <>
            <SectionCards data={data} />
            <RecentUsers data={data} />
          </>
        )}
      </div>
    </div>
  );
}

const RecentUsers = ({ data }: Props) => {
  const users = data?.data?.users;
  const [page, setPage] = useState(users.current_page);

  return (
    <section>
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Activities</h3>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">User</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.length > 0 ? (
                users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.full_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.role === "ADMIN"
                        ? "Admin account created"
                        : "User registered"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    No users found.
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
              Page {users.current_page} of {users.last_page}
            </span>
            <Button
              size="sm"
              className="text-sm"
              disabled={page >= users.last_page}
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
