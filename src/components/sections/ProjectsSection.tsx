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
          title="Projects"
          subtitle="Selected work showcasing real-world problem solving and engineering depth"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2">
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
