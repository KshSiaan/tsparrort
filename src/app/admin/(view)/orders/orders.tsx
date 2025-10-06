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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EllipsisIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeOrderStatusApi, getOrdersApi } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { idk } from "@/lib/utils";
import ViewOrder from "./view-order";
import { toast } from "sonner";
import { useState } from "react";

export default function Orders() {
  const [{ token }] = useCookies(["token"]);
  const [currstat, setCurrStat] = useState<string>("");
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: (): idk => {
      return getOrdersApi({ token });
    },
  });
  const { mutate, isPending: changing } = useMutation({
    mutationKey: ["change_order_status"],
    mutationFn: ({ id, status }: { id: string | number; status: string }) => {
      return changeOrderStatusApi({ id, status, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["orders"] });
      toast.success(res.message ?? "Successfully updated order status!");
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
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map((x: idk) => (
            <TableRow key={x.id}>
              <TableCell>#{x.order_id}</TableCell>
              <TableCell>{x.user.full_name}</TableCell>
              <TableCell>${x.price}</TableCell>
              <TableCell>
                {x.status === "Completed" ? (
                  <Badge variant={"success"}>Completed</Badge>
                ) : (
                  <Badge variant={"outline"}>{x.status}</Badge>
                )}
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
                    <ViewOrder id={x.id} />
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
                      {x.status === "Completed" ? (
                        <Badge variant={"success"}>Completed</Badge>
                      ) : (
                        <Badge variant={"outline"}>{x.status}</Badge>
                      )}
                    </div>
                    <div className="">
                      <Select
                        defaultValue={x.status}
                        onValueChange={(e) => {
                          setCurrStat(e);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button
                        size={"sm"}
                        className="text-sm"
                        onClick={() => {
                          mutate({ id: x.id, status: currstat });
                        }}
                      >
                        {changing ? "Confirming.." : "Confirm Status"}
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
}
