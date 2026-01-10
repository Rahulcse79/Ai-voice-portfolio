export interface Review {
  name: string;
  product: string;
  rating: number;
  comment: string;
}

export interface ReviewGroup {
  id: string;
  title: string;
  reviews: Review[];
}
