import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FeatureCard from "@/components/cards/FeatureCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { storeFeatures } from "@/data/storeFeature";

const FeatureSection = () => {
  return (
    <section id="features" className="py-20">
      <Container>
        <SectionTitle
          title="Features"
          subtitle="Key features and benefits of our store"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storeFeatures.map((item) => (
            <MotionWrapper key={item.id}>
              <FeatureCard feature={item} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default FeatureSection;
