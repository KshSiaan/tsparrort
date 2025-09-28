"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { items } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/lib/api/auth";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Page() {
  const [{ token }, , removeCookie] = useCookies(["token"]);
  const navig = useRouter();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: (): idk => {
      return getProfileApi(token);
    },
  });
  const logOutter = () => {
    removeCookie("token");
    navig.push("/login");
  };
  return (
    <main className="flex flex-col gap-6 items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-4 lg:px-[7%]">
      <div className="flex w-full justify-between">
        <div className="space-y-6 ">
          <h2 className="text-3xl font-semibold">{data?.data?.full_name}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{data?.data?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">
                {data?.data?.phone ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-6">
          <Button variant={"link"} asChild>
            <Link href={"/profile/edit"}>Edit Profile</Link>
          </Button>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={logOutter}
          >
            Log Out
          </Button>
        </div>
      </div>
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Ordered Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#9ds876f8</TableCell>
                <TableCell>{items[5].name}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>Pending</Badge>
                </TableCell>
                <TableCell>{new Date().toDateString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#9ds876f8</TableCell>
                <TableCell>{items[5].name}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>Pending</Badge>
                </TableCell>
                <TableCell>{new Date().toDateString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#9ds876f8</TableCell>
                <TableCell>{items[5].name}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>Pending</Badge>
                </TableCell>
                <TableCell>{new Date().toDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
