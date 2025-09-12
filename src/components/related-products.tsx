"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { items } from "@/lib/products";

interface RelatedProductsProps {
  currentProductId: number;
  category?: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Get 3 random products excluding the current one
  const relatedProducts = items
    .filter((item) => item.id !== currentProductId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">
        You Might Also Like
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow duration-300 border-border pt-0!"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={
                    product.image ||
                    `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(
                      product.name
                    )}`
                  }
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-3">
                <h4 className="font-medium text-foreground text-balance leading-tight">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-secondary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href={`/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
