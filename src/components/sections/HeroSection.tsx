import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/animations/MotionWrapper";
import FadeIn from "@/components/animations/FadeIn";
import SocialLinks from "@/components/ui/SocialLinks";
import { companyProfile } from "@/data/companyProfile";

const HeroSection = () => {
  return (
    <section id="hero" className="py-24 sm:py-28">
      <Container as="main">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <MotionWrapper>
              <FadeIn delay={0.05}>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  Hi, I’m{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {companyProfile.name}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {companyProfile.role}
                </p>
                <p className="mt-2 text-base font-medium text-gray-700 dark:text-gray-300">
                  {companyProfile.headline}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {companyProfile.location}
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-400">
                  {companyProfile.summary}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button as="a" href="#products">
                    Browse Products
                  </Button>

                  {companyProfile.catalogUrl ? (
                    <Button
                      as="a"
                      href={companyProfile.catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                    >
                      Download Report
                    </Button>
                  ) : null}

                  <Button
                    as="a"
                    href={
                      companyProfile.socialLinks.find(
                        (l) => l.label === "WhatsApp"
                      )?.url || "#contact"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="mt-8">
                  <SocialLinks />
                </div>
              </FadeIn>
            </MotionWrapper>
          </div>

          <div className="order-first flex justify-center md:order-none md:justify-end">
            <FadeIn delay={0.15}>
              <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-[360px] md:w-[360px]">
                <Image
                  src="/assets/images/photo.jpeg"
                  alt={companyProfile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, 360px"
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
