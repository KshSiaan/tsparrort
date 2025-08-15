import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { Faqs } from "./faqs";
import { items } from "./products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Screaming Parrots Cafe | Desserts, Tea & Bites</title>
        <meta
          name="description"
          content="Visit The Screaming Parrots Cafe for handcrafted desserts, premium teas, and delicious bites. Indulge in our best sellers and enjoy a cozy dining experience."
        />
        <meta
          name="keywords"
          content="desserts cafe, tea shop, sweet bites, handcrafted desserts, premium tea, Screaming Parrots Cafe"
        />
        <meta property="og:title" content="The Screaming Parrots Cafe" />
        <meta
          property="og:description"
          content="Indulge in handcrafted desserts, premium teas, and delicious bites at The Screaming Parrots Cafe."
        />
        <meta property="og:image" content="/image/logo.webp" />
        <meta property="og:type" content="restaurant" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* LocalBusiness Schema */}
      <Script
        type="application/ld+json"
        id="schema-localbusiness"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CafeOrCoffeeShop",
            name: "The Screaming Parrots Cafe",
            image: "/image/logo.webp",
            description:
              "A cozy cafe offering handcrafted desserts, premium teas, and savory bites.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Cafe Street",
              addressLocality: "Redmond",
              addressRegion: "WA",
              postalCode: "98052",
              addressCountry: "US",
            },
            servesCuisine: ["Desserts", "Tea", "Cafe"],
            priceRange: "$$",
          }),
        }}
      />

      <header className="w-dvw p-0! scroll-smooth">
        <nav
          className="h-30 m-0! w-full bg-primary flex flex-row justify-between items-center px-6"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link href="/" aria-label="The Screaming Parrots Cafe Home">
            <Image
              src={"/image/logo.webp"}
              height={240}
              width={240}
              alt="The Screaming Parrots Cafe logo"
              className="aspect-square! size-24"
            />
          </Link>
          <div>
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
            >
              Order online
            </Button>
          </div>
        </nav>
        <div className="h-12 w-full border-b bg-primary text-shadow-lg font-semibold text-xl text-[#e9ecea] flex justify-center items-center">
          &quot;Indulge in Sweet Serenity&quot;
        </div>
        <Button
          className="px-12 fixed bottom-4 right-4 rounded-full py-6 shadow"
          size={"lg"}
          aria-label="Quick order online"
        >
          Order Online
        </Button>
      </header>

      <main>
        {/* About Section */}
        <section
          id="about"
          className="py-16 grid grid-cols-2 gap-[100px] px-12"
          aria-labelledby="about-title"
        >
          <div className="flex justify-end items-center">
            <Image
              src={"/image/logo.webp"}
              height={500}
              width={500}
              alt="Cafe branding logo"
              className="aspect-square! size-[25dvh] mr-12"
            />
          </div>
          <div className="w-2/3">
            <h1 id="about-title" className="font-bold text-4xl">
              About The Screaming Parrots Cafe
            </h1>
            <p className="mt-4 text-lg font-semibold">
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
          className="mt-24"
          aria-labelledby="featured-title"
        >
          <h2 id="featured-title" className="text-3xl font-bold text-center">
            Our Best Sellers
          </h2>
          <p className="font-semibold text-center mt-6">
            Discover the menu items our customers love most.
          </p>
          <div className="w-[60%] mx-auto grid grid-cols-3 gap-6 mt-12">
            {items.map((x) => (
              <Card
                className="aspect-square! shadow hover:shadow-lg shadow-black transition-shadow!"
                key={x.name}
              >
                <Image
                  src={x.image}
                  height={500}
                  width={500}
                  alt={`${x.name} - popular dessert or drink`}
                  className="h-[85%]! w-full object-contain border-b mr-12"
                />
                <CardHeader>
                  <CardTitle className="font-bold text-xl uppercase">
                    {x.name}
                  </CardTitle>
                  <CardDescription className="text-base font-bold">
                    ${x.price}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="my-24" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-12 w-[60%]">
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
        <div className="border-t border-background/50 mt-3 font-bold text-center pt-6 text-background">
          Copyright © 2025 The Screaming Parrots Cafe: Desserts + Tea + Bites.
          All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
