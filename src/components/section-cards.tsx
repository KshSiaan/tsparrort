import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { IconPackages, IconUsersGroup } from "@tabler/icons-react";
import { DollarSignIcon, TimerResetIcon } from "lucide-react";

export function SectionCards() {
  return (
    <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <CardTitle className="text-2xl font-semibold">1,248</CardTitle>
          <CardDescription>New users this week: 50</CardDescription>
        </CardContent>
      </Card>
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
          <CardTitle className="text-2xl font-semibold">84</CardTitle>
          <CardDescription>Awaiting processing</CardDescription>
        </CardContent>
      </Card>
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-amber-500 text-background">
            <DollarSignIcon />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Complete Orders
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">1,248</CardTitle>
          <CardDescription>Delivered and closed</CardDescription>
        </CardContent>
      </Card>
      <Card className="flex flex-row justify-start items-start px-4 py-4!">
        <div className="flex items-center h-full">
          <div className="rounded-lg aspect-square! p-2 bg-rose-700 text-background">
            <TimerResetIcon />
          </div>
        </div>
        <CardContent className="p-0!">
          <CardDescription className="text-foreground font-medium">
            Pending Approvals
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">12</CardTitle>
          <CardDescription>Today&apos;s Revenue</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
