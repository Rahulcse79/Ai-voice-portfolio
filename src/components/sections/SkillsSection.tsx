import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import SkillCard from "@/components/cards/SkillCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { skills } from "@/data/skills";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20">
      <Container>
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I work with across the stack"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <MotionWrapper key={group.id}>
              <SkillCard title={group.title} skills={group.items} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default SkillsSection;
