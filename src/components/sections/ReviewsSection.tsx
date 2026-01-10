import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ReviewGroupCard from "@/components/cards/ReviewsCard";
import { reviews } from "@/data/reviews";

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle
          title="Customer Reviews"
          subtitle="Real feedback from customers who bought appliances from us"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((group) => (
            <ReviewGroupCard
              key={group.id}
              title={group.title}
              reviews={group.reviews}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ReviewsSection;
