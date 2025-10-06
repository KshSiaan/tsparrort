"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn, idk } from "@/lib/utils";
import { Delete, Loader2Icon, PlusIcon, SearchIcon } from "lucide-react";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { items } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { blankImg } from "@/lib/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteFoodById, getFoods } from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "sonner";
export default function FoodList() {
  const [search, setSearch] = useState<string>("");
  const [{ token }] = useCookies(["token"]);
  const { data, refetch, isPending } = useQuery({
    queryKey: ["foods"],
    queryFn: (): idk => {
      return getFoods({ search });
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["delete_food", search],
    mutationFn: (id: string) => {
      return deleteFoodById({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully deleted!");
      refetch();
    },
  });
  return (
    <>
      <Card>
        <CardHeader className="w-full flex flex-col gap-3 border-b md:flex-row md:items-center md:justify-between ">
          <CardTitle className="text-nowrap">Food management</CardTitle>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center w-full lg:justify-end ">
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>

            <Button className="py-4 text-sm w-full sm:w-auto" asChild>
              <Link href={"foods/add"}>
                <PlusIcon />
                Add food item
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isPending ? (
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.data.map((x: idk) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>${x.price}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"ghost"}>
                            <EyeIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-[55dvw] rounded-2xl overflow-hidden shadow-2xl">
                          <div className="relative">
                            {/* Product Images */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 bg-gray-50">
                              {x.images.map((y: string, i: number) => (
                                <Image
                                  key={y}
                                  height={250}
                                  width={250}
                                  src={y ?? blankImg}
                                  alt={`${x.name}${i}`}
                                  className="w-full aspect-square object-cover rounded-xl transition-transform hover:scale-105 duration-300"
                                />
                              ))}
                            </div>

                            {/* Main Info */}
                            <div className="p-6 space-y-4">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold">
                                  {x.name}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground">
                                  {x.category}
                                </p>
                              </DialogHeader>

                              <p className="text-lg font-medium">
                                💵{" "}
                                <span className="text-gray-800">
                                  ${x.price}
                                </span>
                              </p>

                              {/* Packs */}
                              {x.packs?.length > 0 && (
                                <div className="space-y-2">
                                  <h3 className="text-base font-semibold">
                                    Available Packs:
                                  </h3>
                                  <div className="flex flex-wrap gap-3">
                                    {x.packs.map((pack: any, i: number) => (
                                      <div
                                        key={i}
                                        className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-default"
                                      >
                                        <p className="font-medium text-gray-800">
                                          {pack.size} pcs – ${pack.price}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Description */}
                              <DialogDescription
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    x.additional_description ?? x.description,
                                }}
                              />

                              {/* Related Products */}
                              {x.related?.length > 0 && (
                                <div className="pt-6 border-t">
                                  <h3 className="text-lg font-semibold mb-3">
                                    Related Products
                                  </h3>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {x.related.map((rel: any) => (
                                      <div
                                        key={rel.id}
                                        className="rounded-xl border hover:shadow-lg transition-all overflow-hidden bg-white"
                                      >
                                        <Image
                                          height={150}
                                          width={150}
                                          src={rel.images?.[0] ?? blankImg}
                                          alt={rel.name}
                                          className="w-full aspect-square object-cover"
                                        />
                                        <div className="p-2">
                                          <p className="font-medium">
                                            {rel.name}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            ${rel.price}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant={"ghost"} asChild>
                        <Link href={`foods/${x.id}`}>
                          <EditIcon />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="text-destructive"
                          >
                            <Trash2Icon />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You are going to delete <strong>{x.name}</strong>.
                              This action can not be undone
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                mutate(x.id);
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
