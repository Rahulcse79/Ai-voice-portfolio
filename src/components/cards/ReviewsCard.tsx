interface ReviewGroupCardProps {
  title: string;
  reviews: {
    name: string;
    product: string;
    rating: number;
    comment: string;
  }[];
}

const ReviewGroupCard = ({ title, reviews }: ReviewGroupCardProps) => {
  return (
    <article
      className="
        rounded-2xl border border-gray-200 bg-white p-6
        transition-all hover:shadow-md
        dark:border-gray-700 dark:bg-gray-900
      "
      aria-label={`Customer reviews for ${title}`}
    >
      <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>

      <ul className="space-y-4">
        {reviews.map((review, index) => (
          <li key={index}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {review.name}
              </p>
              <span className="text-yellow-500 text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>

            <p className="text-xs text-gray-500">{review.product}</p>

            <p className="mt-2 inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              “{review.comment}”
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ReviewGroupCard;
