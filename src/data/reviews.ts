import type { ReviewGroup } from "@/types/reviews";

export const reviews: ReviewGroup[] = [
  {
    id: "refrigerator-reviews",
    title: "Refrigerator Reviews",
    reviews: [
      {
        name: "Rahul S.",
        product: "LG 260L Double Door Refrigerator",
        rating: 5,
        comment:
          "Excellent cooling performance and very low electricity consumption. Delivery was quick and hassle-free.",
      },
      {
        name: "Anita K.",
        product: "Whirlpool 190L Single Door Refrigerator",
        rating: 4,
        comment:
          "Good value for money. Compact size fits perfectly in our kitchen.",
      },
    ],
  },
  {
    id: "washing-machine-reviews",
    title: "Washing Machine Reviews",
    reviews: [
      {
        name: "Vikram P.",
        product: "Samsung 7kg Front Load Washing Machine",
        rating: 5,
        comment:
          "Cleans clothes really well and uses less water. Very satisfied with the purchase.",
      },
      {
        name: "Neha R.",
        product: "Bosch 8kg Front Load Washing Machine",
        rating: 4,
        comment: "Quiet operation and strong build quality. Worth the price.",
      },
    ],
  },
  {
    id: "tv-reviews",
    title: "Television Reviews",
    reviews: [
      {
        name: "Amit T.",
        product: "Sony 55” 4K Ultra HD Smart TV",
        rating: 5,
        comment:
          "Amazing picture quality and sound. Perfect for movies and sports.",
      },
      {
        name: "Pooja M.",
        product: "Mi 43” Full HD Smart TV",
        rating: 4,
        comment:
          "Great features at this price. Smart UI is smooth and responsive.",
      },
    ],
  },
];
