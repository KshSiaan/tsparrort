"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface ProductReviewsProps {
  productId: number;
}

// Mock reviews data - in a real app, this would come from an API
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      comment:
        "Absolutely delicious! The shakshuka was perfectly spiced and the presentation was beautiful.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 4,
      comment:
        "Great flavors, though I wish the portion was a bit larger. Will definitely order again!",
      date: "2024-01-10",
    },
  ],
  2: [
    {
      id: 3,
      name: "Emma L.",
      rating: 5,
      comment:
        "The Nutella crepe was heavenly! Perfect balance of sweetness and texture.",
      date: "2024-01-12",
    },
  ],
  3: [
    {
      id: 4,
      name: "David K.",
      rating: 5,
      comment:
        "Rich chocolate flavor that melts in your mouth. Highly recommended!",
      date: "2024-01-08",
    },
  ],
};

export function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = mockReviews[productId] || [];

  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Customer Reviews
        </h3>
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review this item!
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold text-foreground">
          Customer Reviews
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= averageRating
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({averageRating.toFixed(1)}) • {reviews.length} review
            {reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">
                      {review.name}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-secondary text-secondary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
