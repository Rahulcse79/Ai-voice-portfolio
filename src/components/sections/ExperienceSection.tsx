import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ExperienceCard from "@/components/cards/ExperienceCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { experiences } from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <Container>
        <SectionTitle
          title="Experience"
          subtitle="Professional experience and real-world problem solving"
        />

        <StaggerContainer className="grid gap-6">
          {experiences.map((experience) => (
            <MotionWrapper key={experience.id}>
              <ExperienceCard experience={experience} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default ExperienceSection;
