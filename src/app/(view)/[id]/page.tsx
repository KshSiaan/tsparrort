"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { items } from "@/lib/products";
import { MinusIcon, PlusIcon, ArrowLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

import { RelatedProducts } from "@/components/related-products";
import { CartSidebar } from "@/components/cart-sidebar";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);

  const { addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  const product = items.find((item) => String(item.id) === String(id));

  if (!id || !product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    toast("Added to cart!", {
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  // const handleShare = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: product.name,
  //         text: `Check out this delicious ${product.name}!`,
  //         url: window.location.href,
  //       });
  //     } catch (error) {
  //       console.log("Error sharing:", error);
  //     }
  //   } else {
  //     // Fallback: copy to clipboard
  //     navigator.clipboard.writeText(window.location.href);
  //     toast.success("Link copied!", {
  //       description: "Product link copied to clipboard.",
  //     });
  //   }
  // };
  const packs = [
    { title: "4 Pack", price: "$32" },
    { title: "8 Pack", price: "$48" },
    { title: "12 Pack", price: "$99", highlight: true },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className=""></div>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            Artisan Crepes & Desserts
          </h1>
          <CartSidebar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="pb-4">
          <h4 className="font-semibold text-muted-foreground">Pack Size:</h4>
        </div>
        <div className="mb-12 grid grid-cols-3 gap-2 lg:gap-6">
          {packs.map((pack, i) => (
            <Card
              key={i}
              className={cn(
                `aspect-video py-3 gap-2 flex flex-col justify-between rounded-sm transition-colors hover:bg-primary cursor-pointer hover:text-background`,
                selectedPack === pack.title && "bg-primary text-background"
              )}
              onClick={() => {
                setSelectedPack(pack.title);
                if (id) {
                  removeFromCart(parseInt(id as string));
                }
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                });
              }}
            >
              <CardHeader className="px-3">
                <CardTitle className="lg:text-xl">{pack.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-3 font-semibold text-2xl lg:text-6xl">
                {pack.price}
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Product Hero Section */}
        <div className="grid lg:grid-cols-1 gap-4 mb-12">
          {/* Product Image */}
          <Image
            suppressHydrationWarning
            height={500}
            width={500}
            className="object-cover aspect-video w-full rounded"
            src={product.image || `/placeholder.svg?height=600&width=600`}
            alt={product.name}
            priority
            draggable={false}
          />
          <div className="space-y-4 relative">
            <div className="overflow-hidden bg-card">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <Image
                      suppressHydrationWarning
                      height={500}
                      width={500}
                      className="object-cover aspect-square w-full rounded"
                      src={
                        product.image || `/placeholder.svg?height=600&width=600`
                      }
                      alt={product.name}
                      priority
                    />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <Image
                      suppressHydrationWarning
                      height={500}
                      width={500}
                      className="object-cover aspect-square w-full rounded"
                      src={
                        product.image || `/placeholder.svg?height=600&width=600`
                      }
                      alt={product.name}
                      priority
                    />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <Image
                      suppressHydrationWarning
                      height={500}
                      width={500}
                      className="object-cover aspect-square w-full rounded"
                      src={
                        product.image || `/placeholder.svg?height=600&width=600`
                      }
                      alt={product.name}
                      priority
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground text-balance leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Indulge in our artisanal creation, carefully crafted with
                premium ingredients and traditional techniques. Each bite
                delivers an exceptional culinary experience that will delight
                your senses.
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">per serving</span>
            </div>

            {/* Quantity and Add to Cart */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Quantity:
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-12 text-center text-foreground">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      Subtotal:
                    </span>
                    <span className="text-lg font-semibold text-muted-foreground">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              Add to Cart • ${(product.price * quantity).toFixed(2)}
            </Button>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl mb-2">🌟</div>
                <div className="text-sm font-medium text-foreground">
                  Premium Quality
                </div>
                <div className="text-xs text-muted-foreground">
                  Finest ingredients
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium text-foreground">
                  Fresh Made
                </div>
                <div className="text-xs text-muted-foreground">
                  Prepared to order
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <RelatedProducts currentProductId={product.id} />
        </section>
      </main>
    </div>
  );
}
