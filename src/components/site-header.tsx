import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  return (
    <header className="p-6 flex flex-col justify-start h-(--header-height) border-b shrink-0 items-center gap-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <h2 className="text-2xl font-bold hidden lg:block">Dashboard</h2>
        <SidebarTrigger className="-ml-1 lg:hidden" />
        <div className="ml-auto flex items-center gap-2 mr-4">
          <p className="font-semibold">Admin</p>
          <Avatar className="size-10 border-2 p-1">
            <AvatarImage src={"/image/logo.webp"} />
            <AvatarFallback className="text-xs font-semibold">
              LN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="w-full space-y-1 hidden lg:block">
        <p className="text-sm font-semibold">
          Welcome back, Admin! Here&apos;s what&apos;s happening with your
          platform today.
        </p>
      </div>
    </header>
  );
}
