import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/animations/MotionWrapper";
import FadeIn from "@/components/animations/FadeIn";
import { profile } from "@/data/profile";
import { FiArrowUpRight } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-aurora pt-28 pb-24 sm:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-50"
      />

      <Container as="main" className="relative">
        <div
          id="main"
          className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <MotionWrapper>
              <FadeIn delay={0}>
                <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  <span className="block">Hi, I&rsquo;m</span>
                  <span className="text-brand-gradient">{profile.firstName} {profile.lastName}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.08}>
                <p className="mt-6 text-base text-[color:var(--muted)] sm:text-lg">
                  {profile.nickname}
                </p>
              </FadeIn>

              <FadeIn delay={0.12}>
                <p className="mt-4 text-base font-medium text-foreground sm:text-lg">
                  {profile.tagline}
                </p>
              </FadeIn>

              <FadeIn delay={0.18}>
                <p className="balance mt-6 max-w-2xl text-[color:var(--muted)] sm:text-base">
                  {profile.summary}
                </p>
              </FadeIn>

              <FadeIn delay={0.24}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {profile.specialties.map((s) => (
                    <li key={s} className="pill">
                      {s}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button as="a" href="#projects">
                    View Projects
                    <FiArrowUpRight aria-hidden="true" />
                  </Button>

                  <Button as="a" href="#opensource" variant="secondary">
                    Open Source
                  </Button>

                  <Button as="a" href="#contact" variant="outline">
                    Connect via Email
                  </Button>
                </div>
              </FadeIn>
            </MotionWrapper>
          </div>

          {/* Photo with pink frame */}
          <div className="order-first flex justify-center md:order-none md:justify-end">
            <FadeIn delay={0.18}>
              <div className="relative">
                {/* glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-500/30 blur-3xl"
                />
                <div className="relative h-64 w-64 overflow-hidden rounded-2xl p-[3px] sm:h-80 sm:w-80 md:h-[380px] md:w-[340px]">
                  <div className="absolute inset-0 rounded-2xl bg-brand-gradient" />
                  <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                    <Image
                      src="/assets/images/rahul.png"
                      alt={`${profile.name} — ${profile.role}`}
                      fill
                      priority
                      sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, 340px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
