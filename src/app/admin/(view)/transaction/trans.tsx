"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
export default function Users() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["transaction"],
    queryFn: (): idk => {
      return getTransactionApi({ token });
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>ADDRESS</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>PAYMENT DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map((x: idk) => (
            <TableRow key={x.id}>
              <TableCell>{x.id}</TableCell>
              <TableCell>{x.metadata.full_name}</TableCell>
              <TableCell>{x.metadata.address}</TableCell>
              <TableCell>${x.amount}</TableCell>
              <TableCell>
                {x.status === "Completed" ? (
                  <Badge variant={"success"}>{x.status}</Badge>
                ) : (
                  <Badge variant={"outline"}>{x.status}</Badge>
                )}
              </TableCell>
              <TableCell>{x.payment_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
