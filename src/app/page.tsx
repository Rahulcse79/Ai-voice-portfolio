import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ProductsSection";
import FeatureSection from "@/components/sections/FeatureSection";
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
      <ExperienceSection />
      <FeatureSection />
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
