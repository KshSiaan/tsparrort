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
export default function Page() {
  return (
    <div className="p-6 pt-0! flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mt-0!">
        <SectionCards />
        <RecentUsers />
      </div>
    </div>
  );
}

const RecentUsers = () => {
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
              {Array.from({ length: 12 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">12 June 2025</TableCell>
                  <TableCell className="text-center">Liam Nickson</TableCell>
                  <TableCell className="text-center">
                    Order #8765 placed.
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};
