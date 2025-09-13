import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Faqs } from "./_home/faqs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProductSection from "./_home/product-section";

export default function Home() {
  return (
    <>
      <header className="w-dvw p-0!">
        <div className="relative min-h-[82dvh] w-full flex flex-col md:flex-row items-center justify-center px-8 md:px-[10%] overflow-hidden">
          <div className="md:hidden flex-1 flex flex-col justify-center items-start text-primary space-y-4 md:space-y-6 z-10">
            <Link
              href={
                "https://www.google.com/maps/place/The+Screaming+Parrots+Cafe/@47.6743617,-122.1315355,17z/data=!3m1!4b1!4m6!3m5!1s0x549073e1f4800ddb:0x6ad332d891e1ef2c!8m2!3d47.6743582!4d-122.1266646!16s%2Fg%2F11xd3dt169?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D"
              }
              className=" font-bold text-shadow-sm"
            >
              16095 Cleveland St Ste 110, Redmond WA 98052-1565, United States
            </Link>
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
          className="py-16 flex justify-center items-center gap-12 px-6 md:px-12"
          aria-labelledby="about-title"
        >
          {/* <div className="flex justify-center items-center">
            <Image
              src={"/image/logo.webp"}
              height={500}
              width={500}
              alt="Cafe branding logo"
              className="w-40 h-40 md:w-64 md:h-64 object-contain"
            />
          </div> */}
          <div className="w-full md:w-3/4">
            <h1
              id="about-title"
              className="font-bold text-2xl md:text-4xl text-center"
            >
              About The Screaming Parrots Cafe
            </h1>
            <p className="mt-4 text-base md:text-lg font-semibold leading-relaxed text-center">
              Welcome to <strong>The Screaming Parrots Cafe</strong>: Desserts +
              Tea + Bites, where vibrant flavors and a cozy atmosphere create a
              delightful escape. Enjoy handcrafted desserts, an exquisite
              selection of teas, and savory bites made with the freshest
              ingredients. Whether catching up with friends or relaxing solo,
              our cafe is the perfect spot to treat yourself.
            </p>
          </div>
        </section>
        <ProductSection />

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
    </>
  );
}
