"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { HandPlatter } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { items } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const itemsSlot = [
  "Popular Items",
  "Savory Crepes, Breakfast & Brunch",
  "Sweet Crepes",
  "Bakery",
  "Drinks",
  "Ceremonial Grade Matcha",
  "Coffee Beans",
  "Tea",
  "Sugarcane",
  "Real Fruit Puree",
];
export default function ProductSection() {
  const [selectedCat, setSelectedCat] = useState<string>("");
  return (
    <section
      id="featured"
      className="mt-12 lg:px-6 md:px-12 relative"
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
        className="text-2xl md:text-3xl font-bold text-center bg-primary pt-6 text-background!"
      >
        Our Best Sellers
      </h2>
      <p className="font-semibold text-center pt-4 md:pt-6 text-base bg-primary md:text-lg text-background!">
        Discover the menu items our customers love most.
      </p>
      <div className="sticky top-0 z-20 bg-primary backdrop-blur-md py-4">
        <div className="md:flex hidden justify-center items-center flex-wrap gap-6 w-2/3 mx-auto">
          {itemsSlot.map((x) => (
            <Button
              key={x}
              className="shadow-none!"
              variant={selectedCat === x ? "outline" : "default"}
              onClick={() => setSelectedCat(x)}
            >
              {x}
            </Button>
          ))}
        </div>

        <div className="md:hidden p-4">
          <Select value={selectedCat} onValueChange={(e) => setSelectedCat(e)}>
            <SelectTrigger className="w-full text-background!">
              <SelectValue placeholder="Popular items" />
            </SelectTrigger>
            <SelectContent>
              {itemsSlot.map((x) => (
                <SelectItem value={x} key={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-12 mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((x) => (
          <Card
            key={x.id}
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
                  // href={
                  //   "https://order.online/store/the-screaming-parrots-cafe:-desserts-+-tea-+-bites-redmond-34952133/?hideModal=true&pickup=true&redirected=true"
                  // }
                  href={`/${x.id}`}
                >
                  <HandPlatter /> Order now
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
