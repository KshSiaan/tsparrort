import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { idk } from "@/lib/utils";
import { IconPackages, IconUsersGroup } from "@tabler/icons-react";
import { DollarSignIcon, TimerResetIcon } from "lucide-react";

export function SectionCards({ data }: { data: idk }) {
  const stats = data?.data;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users */}
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-blue-500 text-background">
            <IconUsersGroup />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Total Users
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {stats?.total_users ?? 0}
          </CardTitle>
          <CardDescription>List of all registered users</CardDescription>
        </CardContent>
      </Card>

      {/* Pending Orders */}
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-green-700 text-background">
            <IconPackages />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Pending Orders
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {stats?.pending_orders ?? 0}
          </CardTitle>
          <CardDescription>Awaiting processing</CardDescription>
        </CardContent>
      </Card>

      {/* Completed Orders */}
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-amber-500 text-background">
            <DollarSignIcon />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Completed Orders
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {stats?.completed_order ?? 0}
          </CardTitle>
          <CardDescription>Delivered and closed</CardDescription>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-rose-700 text-background">
            <TimerResetIcon />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Total Revenue
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {stats?.total_revenue ?? 0}
          </CardTitle>
          <CardDescription>
            Today&apos;s Revenue {stats?.today_revenue}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
