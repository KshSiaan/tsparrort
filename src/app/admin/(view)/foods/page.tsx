import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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

export default function Page() {
  return (
    <main className="p-6">
      <section className="">
        <Card>
          <CardHeader className="w-full flex flex-col gap-3 border-b md:flex-row md:items-center md:justify-between ">
            <CardTitle>Food management</CardTitle>

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
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((x) => (
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
                  <DialogContent className="max-w-md rounded-2xl p-6">
                    <DialogHeader>
                      <DialogTitle>{x.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-start gap-2">
                      <Image
                        height={248}
                        width={248}
                        src={x.image ?? blankImg}
                        alt="Modern Shakshuka"
                        className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
                      />
                      <p className="text-lg text-gray-700 font-medium">
                        Price: ${x.price}
                      </p>
                      <DialogDescription className="">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Possimus pariatur obcaecati, debitis tenetur
                        laborum praesentium corporis quae sunt, officiis
                        molestias veritatis rem, nemo cupiditate deleniti unde
                        recusandae adipisci fugit. Laboriosam!
                      </DialogDescription>
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
                    <Button variant={"ghost"} className="text-destructive">
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are going to delete <strong>{x.name}</strong>. This
                        action can not be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
