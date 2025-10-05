"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { apiConfig } from "@/lib/config";

interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  images: string[];
  category?: string;
  description?: string;
}

export function RelatedProducts({ related }: { related: RelatedProduct[] }) {
  if (!related || related.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground">
        You Might Also Like
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow duration-300 border-border pt-0!"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={
                    product.images?.[0]
                      ? `${apiConfig.base}${product.images?.[0]}`
                      : ""
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
                    ${parseFloat(product.price).toFixed(2)}
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
