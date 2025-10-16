import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Faqs } from "./_home/faqs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProductSection from "./_home/product-section";
import { CartSidebar } from "@/components/cart-sidebar";
import Banner from "./_home/banner";

export default function Home() {
  return (
    <>
      <div className="fixed bottom-6 right-6 rounded-full z-50 bg-background border size-12 flex items-center justify-center shadow">
        <CartSidebar ghost />
      </div>
      <header className="w-dvw p-0!">
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
        <div className="px-[7%] mt-12">
          <h1 className="block text-lg md:text-3xl mb-12 font-bold tracking-tight drop-shadow-sm text-center">
            The Screaming Parrots
          </h1>
          <Banner />
        </div>
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
