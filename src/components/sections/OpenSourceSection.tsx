import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { openSourceContributions } from "@/data/openSource";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const OpenSourceSection = () => {
  return (
    <section id="opensource" className="py-24">
      <Container>
        <SectionTitle
          eyebrow="Open Source"
          title="Contributing to the rails"
          subtitle="Active forks and contributions to the open-source projects I build my work on — payments, telecom, AI platforms, and developer tooling."
        />

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {openSourceContributions.map((c) => (
            <MotionWrapper key={c.id}>
              <article className="group relative flex h-full flex-col rounded-2xl surface-card p-6 transition-all hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-brand-soft">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-2xl shadow-brand-soft">
                    <span aria-hidden="true">{c.emoji}</span>
                  </div>
                  <span className="pill pill-brand text-[10px] font-semibold uppercase tracking-wider">
                    {c.category}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold tracking-tight text-foreground">
                  {c.project}
                </h3>
                <a
                  href={c.upstreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-[color:var(--muted)] transition-colors hover:text-brand-400"
                >
                  <FaGithub aria-hidden="true" />
                  {c.upstream}
                </a>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
                  {c.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <li key={t} className="pill text-[11px]">
                      {t}
                    </li>
                  ))}
                </ul>

                <footer className="mt-5 flex items-center gap-5 border-t border-white/5 pt-4 text-sm">
                  <a
                    href={c.forkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-brand-400 transition-colors hover:text-brand-300"
                  >
                    <FiExternalLink aria-hidden="true" />
                    My fork
                  </a>
                  <a
                    href={c.upstreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[color:var(--muted)] transition-colors hover:text-foreground"
                  >
                    <FaGithub aria-hidden="true" />
                    Upstream
                  </a>
                </footer>
              </article>
            </MotionWrapper>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default OpenSourceSection;
