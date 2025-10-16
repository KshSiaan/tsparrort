"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon, ArrowLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { RelatedProducts } from "@/components/related-products";
import { CartSidebar } from "@/components/cart-sidebar";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn, idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { viewProductbyId } from "@/lib/api/base";

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const navig = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["view_product", id],
    queryFn: (): idk => viewProductbyId({ id: String(id) }),
    enabled: !!id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (!id || isError || !data?.data) {
    return notFound();
  }

  const product = data.data;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        images: product.images,
      },
      quantity
    );

    toast("Added to cart!", {
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const packs = product.packs.length ? product.packs : [];
  console.log(product);

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
        {/* Pack Selection */}
        <div className="pb-4">
          <h4 className="font-semibold text-muted-foreground">Pack Size:</h4>
        </div>
        <div className="mb-12 gap-2 lg:gap-6">
          {packs.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-3 gap-2 lg:gap-6 w-full ">
                {packs.map((pack: idk, i: number) => (
                  <Card
                    key={i}
                    className={cn(
                      "aspect-video py-3 gap-2 flex flex-col justify-between rounded-sm transition-colors hover:bg-primary cursor-pointer hover:text-background"
                    )}
                    onClick={() => {
                      // addToCart(
                      //   {
                      //     id: pack.id,
                      //     name: product.name,
                      //     price: parseFloat(pack.price),
                      //     images: product.images,
                      //   },
                      //   parseInt(pack.pack_size)
                      // );
                      if (localStorage.getItem("packBuy")) {
                        localStorage.removeItem("packBuy");
                      }
                      localStorage.setItem(
                        "packBuy",
                        JSON.stringify({
                          product_name: product.name,
                          product_id: product.id,
                          pack_id: pack.id,
                          size: pack.pack_size,
                          price: pack.price,
                        })
                      );
                      navig.push("/checkout_pack");
                    }}
                  >
                    <CardHeader className="px-3">
                      <CardTitle className="lg:text-xl">
                        {pack.pack_size} pcs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 font-semibold text-2xl lg:text-4xl">
                      ${parseFloat(pack.price).toFixed(2)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Hero Section */}
        <div className="grid lg:grid-cols-1 gap-4 mb-12 overflow-visible!">
          {/* <Image
            suppressHydrationWarning
            height={500}
            width={500}
            className="object-cover aspect-video w-full rounded"
            src={product.images[0] || `/placeholder.svg?height=600&width=600`}
            alt={product.name}
            priority
            draggable={false}
          /> */}
          <div className="space-y-4 relative overflow-visible!">
            <div className="overflow-visible! bg-card">
              <Carousel
                opts={{
                  loop: true,
                  slidesToScroll: 1,
                }}
                className="w-full overflow-visible!"
              >
                <CarouselContent className="!overflow-visible">
                  {product.images.map((img: string, idx: number) => (
                    <CarouselItem
                      key={idx}
                      className="basis-[66.666%] relative !overflow-visible"
                    >
                      <Image
                        height={500}
                        width={500}
                        className="object-cover aspect-video w-full rounded"
                        src={img}
                        alt={product.name}
                        priority
                      />
                      {idx === 0 && (
                        <div className="absolute size-[110px] bg-gradient-to-br from-primary/90 via-primary to-primary/80 rounded-full border-[3px] border-white shadow-lg -top-[45px] -right-[45px] z-30 flex flex-col justify-center items-center text-white font-semibold text-sm tracking-wide rotate-[15deg] hover:rotate-[0deg] transition-all duration-500 ease-out [animation-duration:4s]">
                          <p className="text-xs uppercase">Most</p>
                          <p className="text-base font-extrabold">Popular</p>
                        </div>
                      )}
                    </CarouselItem>
                  ))}
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
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">per serving</span>
            </div>

            {/* Quantity Selector */}
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
                      ${(parseFloat(product.price) * quantity).toFixed(2)}
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
              Add to Cart • ${(parseFloat(product.price) * quantity).toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <RelatedProducts related={product.related} />
        </section>
      </main>
    </div>
  );
}
