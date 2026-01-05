import SectionTitle from "@/components/ui/SectionTitle";
import AchievementCard from "@/components/cards/AchievementCard";
import Container from "@/components/layout/Container";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { achievements } from "@/data/achievements";

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20">
      <Container>
        <SectionTitle
          title="Achievements & Certifications"
          subtitle="Recognitions, certifications, and milestones earned through continuous learning"
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <MotionWrapper key={achievement.id}>
              <AchievementCard achievement={achievement} />
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default AchievementsSection;
