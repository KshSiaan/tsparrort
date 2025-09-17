"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { items } from "@/lib/products";
import {
  MinusIcon,
  PlusIcon,
  ArrowLeft,
  Share2,
  Loader2Icon,
} from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

import { RelatedProducts } from "@/components/related-products";
import { CartSidebar } from "@/components/cart-sidebar";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this delicious ${product.name}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!", {
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        {/* Product Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
              <Image
                suppressHydrationWarning
                fill
                className="object-cover"
                src={
                  product.image ||
                  `/placeholder.svg?height=600&width=600&query=${
                    encodeURIComponent(product.name) || "/placeholder.svg"
                  }`
                }
                alt={product.name}
                priority
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-background/80 backdrop-blur"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
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
        <div className="pb-4">
          <h4 className="font-semibold text-muted-foreground">Pack Size:</h4>
        </div>
        <div className="mb-12 grid grid-cols-3  gap-2 lg:gap-6">
          <Card className="aspect-video py-3 gap-2 hover:bg-primary/80 hover:text-background transition-colors flex flex-col justify-between rounded-sm">
            <CardHeader className="px-3">
              <CardTitle className="lg:text-xl">4 Pack</CardTitle>
            </CardHeader>
            <CardContent className="px-3 font-semibold text-2xl lg:text-6xl">
              $32
            </CardContent>
          </Card>
          <Card className="aspect-video py-3 gap-2 hover:bg-primary/80 hover:text-background transition-colors flex flex-col justify-between rounded-sm">
            <CardHeader className="px-3">
              <CardTitle className="lg:text-xl">8 Pack</CardTitle>
            </CardHeader>
            <CardContent className="px-3 font-semibold text-2xl lg:text-6xl">
              $48
            </CardContent>
          </Card>
          <Card className="aspect-video relative py-3 gap-2 hover:bg-primary/80 hover:text-background transition-colors flex flex-col justify-between border-primary border-2 rounded-sm">
            <div className="absolute right-2 -top-6 rounded-full size-12 bg-primary text-[8px] text-background font-bold flex justify-center items-center text-center">
              Shipping Free
            </div>
            <CardHeader className="px-3">
              <CardTitle className="lg:text-xl">12 Pack</CardTitle>
            </CardHeader>
            <CardContent className="px-3 font-semibold text-2xl lg:text-6xl">
              $99
            </CardContent>
          </Card>
        </div>
        {/* Reviews Section */}
        {/* <section className="mb-12">
          <ProductReviews productId={product.id} />
        </section> */}

        {/* Related Products */}
        <section>
          <RelatedProducts currentProductId={product.id} />
        </section>
      </main>
    </div>
  );
}
