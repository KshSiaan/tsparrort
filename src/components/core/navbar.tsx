"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [onit, setOnit] = useState(false);
  const [{ token }] = useCookies(["token"]);
  useEffect(() => {
    setOnit(true);
  }, []);
  return (
    <nav
      className="h-30 m-0! w-full bg-primary flex flex-row justify-between items-center px-6"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center gap-6">
        <Link href="/" aria-label="The Screaming Parrots Cafe Home">
          <div className="bg-background rounded-full p-2">
            <Image
              src={"/image/logo.webp"}
              height={240}
              width={240}
              alt="The Screaming Parrots Cafe logo"
              className="aspect-square! size-14"
            />
          </div>
        </Link>
      </div>
      <h1 className="md:hidden text-lg text-background md:text-6xl font-bold tracking-tight drop-shadow-sm text-center">
        The Screaming Parrots
      </h1>
      <div className="hidden md:flex items-center gap-4">
        {[
          { label: "About", target: "/#about" },
          { label: "Featured", target: "/#featured" },
          { label: "Reviews", target: "/#faqs" },
        ].map((x) => (
          <Button
            className="text-background hover:text-green-950 shadow-none! transition-colors no-underline! cursor-pointer"
            key={x.label}
            asChild
          >
            <a href={x.target}>{x.label}</a>
          </Button>
        ))}
        <Button
          className="text-background hover:text-green-950 shadow-none! transition-colors no-underline! cursor-pointer"
          aria-label="Order desserts and tea online"
          asChild
        >
          <Link
            href={`https://order.online/store/the-screaming-parrots-cafe:-desserts-+-tea-+-bites-redmond-34952133/?hideModal=true&pickup=true&redirected=true`}
          >
            Order online
          </Link>
        </Button>

        {onit && (
          <Button
            className="bg-background hover:bg-background/80 rounded-full text-primary"
            aria-label="Order desserts and tea online"
            asChild
          >
            {token ? (
              <Link href={`/profile`}>View Profile</Link>
            ) : (
              <Link href={`/login`}>Log in / Sign up</Link>
            )}
          </Button>
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            className="p-6! text-background bg-transparent! cursor-pointer hover:text-foreground md:hidden"
            variant={"ghost"}
          >
            <MenuIcon className="size-8" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <Image
              src={"/image/logo.webp"}
              height={240}
              width={240}
              alt="The Screaming Parrots Cafe logo"
              className="aspect-square! size-24 mx-auto"
            />
          </SheetHeader>
          <div className="flex flex-col gap-6 px-6">
            {" "}
            {[
              { label: "About", target: "#about" },
              { label: "Featured", target: "#featured" },
              { label: "Reviews", target: "#faqs" },
            ].map((x) => (
              <Button
                className="bg-background text-foreground hover:text-green-950 shadow-none! transition-colors no-underline! cursor-pointer"
                key={x.label}
                asChild
              >
                <a href={x.target}>{x.label}</a>
              </Button>
            ))}
            <Button
              className="rounded-full!"
              aria-label="Order desserts and tea online"
              asChild
            >
              <Link
                href={`https://order.online/store/the-screaming-parrots-cafe:-desserts-+-tea-+-bites-redmond-34952133/?hideModal=true&pickup=true&redirected=true`}
              >
                Order online
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
