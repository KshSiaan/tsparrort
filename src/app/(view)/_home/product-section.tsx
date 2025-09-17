"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ChevronDown, MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { items } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

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
  const [selectedCat, setSelectedCat] = useState<string>(itemsSlot[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  return (
    <section
      id="featured"
      className="mt-12 lg:px-6 md:px-12 relative"
      aria-labelledby="featured-title"
    >
      {/* Follow Us button */}
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

      {/* Title */}
      <h2
        id="featured-title"
        className="text-2xl md:text-3xl font-bold text-center pt-6"
      >
        Our Best Sellers
      </h2>
      <p className="font-semibold text-center pt-4 md:pt-6 text-base  md:text-lg">
        Discover the menu items our customers love most.
      </p>

      {/* Desktop Category Buttons */}
      <div className="py-4">
        <div className="md:flex hidden justify-center items-center flex-wrap gap-6 w-2/3 mx-auto">
          {itemsSlot.map((x) => (
            <Button
              key={x}
              className="shadow-none!"
              variant={selectedCat === x ? "outline" : "default"}
              size={"lg"}
              onClick={() => setSelectedCat(x)}
            >
              {x}
            </Button>
          ))}
        </div>
      </div>

      {/* Sticky Mobile Dropdown */}
      <div className="w-full sticky top-0 z-40 md:hidden bg-white">
        {/* Button always above backdrop */}
        <div className="relative z-50">
          <Button
            className="w-full flex justify-center items-center rounded-none! py-6"
            onClick={() => setIsOpen((prev) => !prev)}
            size={"lg"}
          >
            {selectedCat}{" "}
            <ChevronDown
              className={isOpen ? "rotate-180 transition" : "transition"}
            />
          </Button>
        </div>

        {/* Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-30" // lower than button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white z-40 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {itemsSlot.map(
                (x) =>
                  selectedCat !== x && (
                    <Button
                      key={x}
                      className="w-full justify-center rounded-none! py-6"
                      variant={"ghost"}
                      size={"lg"}
                      onClick={() => {
                        setSelectedCat(x);
                        setIsOpen(false);
                      }}
                    >
                      {x}
                    </Button>
                  )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid */}
      <div className="mt-12 mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((x) => (
          <Card
            key={x.id}
            className="relative shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden pt-0 flex flex-col justify-between"
          >
            <div className="w-full aspect-[4/3] flex items-center justify-center bg-white">
              <Link href={`/${x.id}`}>
                <Image
                  src={x.image}
                  alt={`${x.name} - popular dessert or drink`}
                  width={400}
                  height={400}
                  className="object-cover aspect-[4/3] max-w-[100%]"
                />
              </Link>
            </div>
            <CardHeader>
              <Link href={`/${x.id}`}>
                <CardTitle className="font-bold text-sm md:text-xl uppercase text-center hover:text-muted-foreground transition-colors cursor-pointer">
                  {x.name}
                </CardTitle>
              </Link>
              <CardDescription className="text-base font-bold text-center text-gray-600">
                ${x.price}
              </CardDescription>
            </CardHeader>
            {/* <div className="bg-primary/10 backdrop-brightness-20 opacity-0 hover:opacity-100! h-full w-full absolute transition-all flex justify-center items-center">
              <Button asChild>
                <Link href={`/${x.id}`}>
                  <HandPlatter /> Order now
                </Link>
              </Button>
            </div> */}
            <CardFooter className="w-full flex justify-center gap-6 items-center">
              <Button
                onClick={() => {
                  if (cart) {
                    const currQt = cart.find((y) => y.id === x.id)?.quantity;
                    if (Number(currQt) > 0) {
                      if (Number(currQt) <= 1) {
                        removeFromCart(x.id);
                        return;
                      }
                      addToCart(x, -1);
                    }
                  }
                }}
              >
                <MinusIcon />
              </Button>
              <div className="text-lg font-semibold text-muted-foreground">
                {cart.find((y) => y.id === x.id)?.quantity ?? 0}
              </div>
              <Button
                onClick={() => {
                  addToCart(x, 1);
                }}
              >
                <PlusIcon />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
