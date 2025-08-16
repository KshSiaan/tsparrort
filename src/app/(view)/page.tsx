import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Faqs } from "./faqs";
import { items } from "./products";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HandPlatter, MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <header className="w-dvw p-0!">
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
            <h1 className="hidden md:block text-sm text-background md:text-xl font-bold tracking-tight drop-shadow-sm text-center">
              The Screaming Parrots
            </h1>
          </div>
          <h1 className="md:hidden text-lg text-background md:text-6xl font-bold tracking-tight drop-shadow-sm text-center">
            The Screaming Parrots
          </h1>
          <div className="hidden md:block">
            {[
              { label: "About", target: "#about" },
              { label: "Featured", target: "#featured" },
              { label: "Reviews", target: "#faqs" },
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
              className="bg-background hover:bg-background/80 rounded-full text-primary"
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

        <div className="relative min-h-[82dvh] w-full flex flex-col md:flex-row items-center justify-center px-8 md:px-[10%] overflow-hidden">
          <div className="md:hidden flex-1 flex flex-col justify-center items-start text-primary space-y-4 md:space-y-6 z-10">
            <Button
              variant={"link"}
              className="text-sm md:text-sm font-medium drop-shadow-sm "
              asChild
            >
              <Link
                href={
                  "https://www.google.com/maps/place/The+Screaming+Parrots+Cafe/@47.6743617,-122.1315355,17z/data=!3m1!4b1!4m6!3m5!1s0x549073e1f4800ddb:0x6ad332d891e1ef2c!8m2!3d47.6743582!4d-122.1266646!16s%2Fg%2F11xd3dt169?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
                }
              >
                16095 Cleveland St Ste 110, Redmond WA 98052-1565, United States
              </Link>
            </Button>
          </div>

          <div className="flex-1 flex justify-center items-center relative z-0">
            <div className="absolute inset-0 rounded-3xl scale-105 -top-5">
              <div className="h-12 w-full font-bold text-xl text-foreground flex justify-center items-center">
                &quot;Customers Favorite&quot;
              </div>
            </div>

            <div className="">
              <Image
                src="/image/header-img.png"
                alt="The Screaming Parrots Cafe logo"
                className="relative w-full max-w-lg md:max-w-xl object-contain animate-fade-in"
                height={1240}
                width={1240}
              />
              <div className="hidden md:flex flex-col justify-center items-center text-primary space-y-4 md:space-y-6 z-10">
                <Button
                  variant={"link"}
                  className="text-sm md:text-sm font-medium drop-shadow-sm "
                  asChild
                >
                  <Link
                    href={
                      "https://www.google.com/maps/place/The+Screaming+Parrots+Cafe/@47.6743617,-122.1315355,17z/data=!3m1!4b1!4m6!3m5!1s0x549073e1f4800ddb:0x6ad332d891e1ef2c!8m2!3d47.6743582!4d-122.1266646!16s%2Fg%2F11xd3dt169?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
                    }
                  >
                    16095 Cleveland St Ste 110, Redmond WA 98052-1565, United
                    States
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          asChild
          className={cn(
            `fixed bottom-6 rounded-full px-10 py-6 z-50
     bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600
     text-white font-extrabold text-lg tracking-wide
     shadow-[0_0_25px_rgba(251,146,60,0.7)]
     border border-orange-300/70
     transition-all duration-300 ease-out
     animate-bounce
     hover:scale-110 hover:shadow-[0_0_40px_rgba(251,146,60,1)]
     active:scale-95`,
            "-left-1/2 -translate-x-1/2 md:left-1/2 bottom-6"
          )}
        >
          <Link
            href={`https://order.online/store/the-screaming-parrots-cafe:-desserts-+-tea-+-bites-redmond-34952133/?hideModal=true&pickup=true&redirected=true`}
          >
            🌿 Order Online 🌿
          </Link>
        </Button>
      </header>

      <main>
        {/* About Section */}
        <section
          id="about"
          className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12"
          aria-labelledby="about-title"
        >
          <div className="flex justify-center items-center">
            <Image
              src={"/image/logo.webp"}
              height={500}
              width={500}
              alt="Cafe branding logo"
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
            />
          </div>
          <div className="w-full md:w-3/4">
            <h1 id="about-title" className="font-bold text-2xl md:text-4xl">
              About The Screaming Parrots Cafe
            </h1>
            <p className="mt-4 text-base md:text-lg font-semibold leading-relaxed">
              Welcome to <strong>The Screaming Parrots Cafe</strong>: Desserts +
              Tea + Bites, where vibrant flavors and a cozy atmosphere create a
              delightful escape. Enjoy handcrafted desserts, an exquisite
              selection of teas, and savory bites made with the freshest
              ingredients. Whether catching up with friends or relaxing solo,
              our cafe is the perfect spot to treat yourself.
            </p>
          </div>
        </section>

        {/* Featured Section */}
        <section
          id="featured"
          className="mt-12 px-6 md:px-12"
          aria-labelledby="featured-title"
        >
          <div className="flex justify-center items-center mb-12">
            <Button
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-white font-bold shadow-lg",
                "bg-orange-400!",
                "hover:scale-105 transition-transform duration-200"
              )}
              asChild
            >
              <a
                href="https://www.instagram.com/thescreamingparrots?igsh=MTMzNHRkNGVnYjRxMg=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </Button>
          </div>
          <h2
            id="featured-title"
            className="text-2xl md:text-3xl font-bold text-center"
          >
            Our Best Sellers
          </h2>
          <p className="font-semibold text-center mt-4 md:mt-6 text-base md:text-lg">
            Discover the menu items our customers love most.
          </p>

          <div className="mt-12 mx-auto max-w-6xl grid grid-cols-3 gap-6">
            {items.map((x) => (
              <Card
                key={x.name}
                className="relative shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden pt-0"
              >
                <div className="w-full aspect-square flex items-center justify-center bg-white">
                  <Image
                    src={x.image}
                    alt={`${x.name} - popular dessert or drink`}
                    width={400}
                    height={400}
                    className="object-cover aspect-square max-w-[100%]"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-bold text-sm md:text-xl uppercase text-center">
                    {x.name}
                  </CardTitle>
                  <CardDescription className="text-base font-bold text-center text-gray-600">
                    ${x.price}
                  </CardDescription>
                </CardHeader>
                <div className="bg-primary/10 backdrop-brightness-20 opacity-0 hover:opacity-100! h-full w-full absolute transition-all flex justify-center items-center">
                  <Button asChild>
                    <Link
                      href={
                        "https://order.online/store/the-screaming-parrots-cafe:-desserts-+-tea-+-bites-redmond-34952133/?hideModal=true&pickup=true&redirected=true"
                      }
                    >
                      <HandPlatter /> Order now
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="my-24" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-12 md:w-[60%] px-6 md:px-0">
            <Faqs />
          </div>
        </section>
      </main>

      <footer className="p-6 bg-primary" role="contentinfo">
        <div>
          <Image
            src={"/image/logo.webp"}
            height={240}
            width={240}
            alt="The Screaming Parrots Cafe footer logo"
            className="aspect-square! size-24"
          />
        </div>
        <div className="border-t border-background/50 mt-3 font-bold text-center pt-6 text-background text-xs sm:text-sm md:text-base">
          Copyright © 2025 The Screaming Parrots Cafe: Desserts + Tea + Bites.
          All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
