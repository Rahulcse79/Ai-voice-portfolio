import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import { TranscriptProvider } from "@/contexts/TranscriptContext";
import { EventProvider } from "@/contexts/EventContext";
import React, { Suspense } from "react";
import App from "./App";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      <Suspense fallback={<div>Loading...</div>}>
        <TranscriptProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </TranscriptProvider>
      </Suspense>
    </>
  );
}
