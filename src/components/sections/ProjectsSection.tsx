import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/cards/ProjectCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects shipping in production"
          subtitle="Real systems serving real users — synthesised from my GitHub, with quantifiable engineering impact."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <MotionWrapper key={project.id}>
              <ProjectCard project={project} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default ProjectsSection;
