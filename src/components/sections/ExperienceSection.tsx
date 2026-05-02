import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ExperienceCard from "@/components/cards/ExperienceCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { experiences } from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24">
      <Container>
        <SectionTitle
          eyebrow="Career"
          title="Experience"
          subtitle="Production engineering with measurable business outcomes."
        />

        <StaggerContainer>
          <ol className="relative">
            {experiences.map((experience, idx) => (
              <MotionWrapper key={experience.id}>
                <ExperienceCard
                  experience={experience}
                  isLast={idx === experiences.length - 1}
                />
              </MotionWrapper>
            ))}
          </ol>
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default ExperienceSection;
