import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import OpenSourceSection from "@/components/sections/OpenSourceSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import { TranscriptProvider } from "@/contexts/TranscriptContext";
import { EventProvider } from "@/contexts/EventContext";
import React, { Suspense } from "react";
import AppClient from "@/components/assistant/AppClient";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <OpenSourceSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      <Suspense fallback={<div>Loading...</div>}>
        <TranscriptProvider>
          <EventProvider>
          <AppClient />
          </EventProvider>
        </TranscriptProvider>
      </Suspense>
    </>
  );
}
