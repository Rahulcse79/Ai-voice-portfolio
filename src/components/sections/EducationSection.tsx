import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import EducationCard from "@/components/cards/EducationCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { education } from "@/data/education";

const EducationSection = () => {
  return (
    <section id="education" className="py-20">
      <Container>
        <SectionTitle
          title="Education"
          subtitle="Academic background and formal qualifications"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((item) => (
            <MotionWrapper key={item.id}>
              <EducationCard education={item} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default EducationSection;
