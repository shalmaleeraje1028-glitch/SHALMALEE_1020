import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import heroBlobs from "@/assets/vangogh-hero.jpg";
import lajjaThumb from "@/assets/lajja-thumbnail.png";
import favicon from "../assets/Shalmalee.png";

export const Route = createFileRoute("/")({ 
  head: () => ({
    meta: [
      { title: "Shalmalee Raje — UI/UX Developer" },
      {
        name: "description",
        content:
          "The Museum of Shalmalee — a curated portfolio of UI/UX developer Shalmalee Raje.",
      },
    ],
    links: [
      {
        rel: "icon",
        href: favicon,
        type: "image/png",
      },
    ],
  }),
  component: Portfolio,
});

/* ---------- Custom cursor ---------- */
function Cursor() {
  const x = useSpring(0, { stiffness: 400, damping: 30, mass: 0.4 });
  const y = useSpring(0, { stiffness: 400, damping: 30, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      if (el) {
        setHover(true);
        setLabel(el.dataset.cursor || null);
      } else {
        setHover(false);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      aria-hidden
    >
      <motion.div
        animate={{
          scale: hover ? 3.2 : 1,
          backgroundColor: hover ? "var(--accent)" : "var(--primary)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 14, height: 14, mixBlendMode: "multiply" }}
      />
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-4 top-4 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Magnetic wrapper ---------- */
function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Marquee ---------- */
function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-foreground/15 py-4 bg-background">
      <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.35em]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Reveal ---------- */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Tilt ---------- */
function Tilt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================ PAGE ============================ */
function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroParallax = useTransform(scrollYProgress, [0, 0.5], [0, -120]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Cursor />
      <motion.div
        style={{ width: progressX }}
        className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-primary via-accent to-secondary"
      />
      <Nav />
      <Hero parallax={heroParallax} />
      <Marquee
        items={[
          "Room I · Foyer",
          "Room II · Practice",
          "Room III · Exhibits",
          "Room IV · Correspondence",
        ]}
      />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------- Nav (with scroll-solid background) ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-foreground/15 bg-background/85 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          data-cursor="entrance"
          className="flex items-center gap-3 uppercase tracking-[0.2em] text-sm font-bold"
        >
          <span className="inline-block size-2 rounded-full bg-accent" />
          The Museum of Shalmalee
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex">
          {[
            ["I. Foyer", "#about"],
            ["II. Practice", "#skills"],
            ["III. Exhibits", "#work"],
            ["IV. Contact", "#contact"],
          ].map(([l, h]) => (
            <a key={h} href={h} data-cursor="enter" className="group relative">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <Magnetic>
          <a
            href="https://drive.google.com/file/d/1lf-1ERCpvl-zlbObYlXa4w2N-KR3ZNUw/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            data-cursor="download"
            className="rounded-full border border-foreground bg-foreground px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
          >
            Museum Guide ↓
          </a>
        </Magnetic>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ parallax }: { parallax: any }) {
  return (
    <section
      id="top"
      className="relative grain overflow-hidden pt-36 pb-20 md:pt-44 md:pb-32"
    >
      <motion.img
        src={heroBlobs}
        alt="Starry night inspired backdrop"
        style={{ y: parallax }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-12 bg-foreground/40" /> Now Open · Est. 2026
            · Free Admission
          </p>
        </Reveal>
        <h1 className="relative text-[13vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[9.5rem] text-cream drop-shadow-[0_6px_24px_rgba(15,23,66,0.55)]">
          <SplitWord text="SHALMALEE" />
          <span className="block text-accent">
            <SplitWord text="RAJE." delay={0.4} />
          </span>
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.3} className="md:col-span-7">
            <p className="text-lg text-balance md:text-2xl leading-snug">
              UI/UX Developer I curate{" "}
              <em className="text-accent not-italic font-semibold">
                interfaces like exhibits
              </em>
              : researched, arranged with intent, and framed for the person
              walking through them.
            </p>
          </Reveal>
          <Reveal
            delay={0.5}
            className="md:col-span-4 md:col-start-9 flex flex-col items-start gap-2 self-end text-sm"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Museum Location
            </span>
            <span className="text-xl font-semibold">Pune, Maharashtra 🇮🇳</span>
            <a
              href="mailto:shalmaleeraje1028@gmail.com"
              data-cursor="email"
              className="mt-3 underline-offset-4 hover:underline"
            >
              shalmaleeraje1028@gmail.com
            </a>
          </Reveal>
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              data-cursor="tour"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground text-sm uppercase tracking-[0.2em] transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              Begin the tour
              <span className="grid size-6 place-items-center rounded-full bg-primary-foreground/15 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-cursor="say hi"
              className="rounded-full border border-foreground/30 px-7 py-4 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Guestbook
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.04,
          }}
          className="inline-block"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- Section header (museum plaque) ---------- */
function RoomHeader({
  n,
  title,
  sub,
}: {
  n: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-14 flex items-center gap-6">
      <div className="grid size-14 place-items-center rounded-full border border-foreground text-sm font-bold">
        {n}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Room {n}
        </p>
        <h2 className="mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl">
          {title}
        </h2>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"
    >
      <RoomHeader
        n="I"
        title="The Foyer"
        sub="An introduction to the curator"
      />
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="text-2xl leading-snug md:text-4xl font-light">
            I'm passionate about UI/UX because it lets me{" "}
            <span className="text-primary font-semibold">
              understand people
            </span>{" "}
            beyond the screen — researching behavior, finding quiet pain points,
            and shaping digital spaces that feel
            <span className="text-accent font-semibold">
              {" "}
              simple, meaningful, and human
            </span>
            .
          </p>
        </Reveal>
        <Reveal
          delay={0.2}
          className="md:col-span-4 border-l border-foreground/15 pl-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Wall Label
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Shalmalee Raje (b. Pune) is a UI/UX developer working at the
            intersection of research, interface and code — treating every
            product as a small exhibition.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["40+", "User interviews"],
            ["05", "Live client sites"],
            ["03", "Internships"],
            ["∞", "Cups of chai"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-2xl border border-foreground/20 bg-card p-5"
            >
              <div className="text-5xl font-bold text-primary">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {l}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Skills with measuring bars ---------- */
function Skills() {
  const tech: [string, number][] = [
    ["Python", 90],
    ["Figma", 90],
    ["JavaScript", 80],
    ["HTML / CSS", 80],
  ];
  const soft = [
    "User Research",
    "Empathy-driven design",
    "Design Thinking",
    "Prototyping",
    "Interaction Design",
    "Visual Storytelling",
  ];

  return (
    <section
      id="skills"
      className="relative bg-foreground text-background grain"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex items-center gap-6">
          <div className="grid size-14 place-items-center rounded-full border border-background text-sm font-bold">
            II
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] opacity-60">
              Room II
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl">
              The Practice Room
            </h2>
            <p className="mt-1 text-sm opacity-60">Instruments & disciplines</p>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7 space-y-7">
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">
              Technical Proficiency
            </p>
            {tech.map(([name, pct], i) => (
              <SkillBar key={name} name={name} pct={pct} delay={i * 0.08} />
            ))}
          </div>

          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">
              Craft & Approach
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {soft.map((s) => (
                <Magnetic key={s}>
                  <span
                    data-cursor="•"
                    className="inline-flex cursor-pointer rounded-full border border-background/40 px-4 py-2 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-background hover:text-foreground"
                  >
                    {s}
                  </span>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  pct,
  delay = 0,
}: {
  name: string;
  pct: number;
  delay?: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-lg font-semibold uppercase tracking-[0.1em]">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.6 }}
          className="text-sm font-mono opacity-70"
        >
          {pct}%
        </motion.span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-background/15">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay }}
          className="h-full rounded-full bg-gradient-to-r from-accent via-secondary to-accent"
        />
      </div>
    </div>
  );
}

/* ---------- Projects (exhibits) ---------- */
type Exhibit = {
  id: string;
  no: string;
  title: string;
  role: string;
  year: string;
  medium: string;
  desc: string;
  href: string;
  thumb?: string;
  liveEmbed?: boolean;
};

const EXHIBITS: Exhibit[] = [
  {
    id: "synaptris",
    no: "01",
    title: "Synaptris",
    role: "UX & Marketing Intern",
    year: "Feb – May 2026",
    medium: "Product · Marketing · Research",
    desc: "Most recent internship. Contributed to UX flows, marketing assets, and user-facing pages for a B2B analytics platform.",
    href: "https://synaptris.com/",
    liveEmbed: true,
  },
  {
    id: "maddie",
    no: "02",
    title: "Maddie's Magical Moments",
    role: "End-to-end Designer & Developer (Internship)",
    year: "January 2026",
    medium: "Website · Booking flow",
    desc: "A full website built for a UK-based face-painting business — warm, playful, bookable.",
    href: "https://maddiesmagicalmomentsfacepaint.co.uk/",
    liveEmbed: true,
  },
  {
    id: "craft",
    no: "03",
    title: "The Craft Village",
    role: "Website Designer & Developer",
    year: "Jan – Jul 2025",
    medium: "E-commerce · Craft storytelling",
    desc: "Built the full website for The Craft Village — a marketplace celebrating Indian artisans and handmade craft.",
    href: "https://thecraftvillage.in/",
    liveEmbed: true,
  },
  {
    id: "vasu",
    no: "04",
    title: "Vasu Visuals",
    role: "Contributing Web Designer / Developer",
    year: "2022 – 2023",
    medium: "Multiple client websites",
    desc: "Contributed to a range of client website design and development projects across the Vasu Visuals studio.",
    href: "https://linkedin.com/in/vasu-visuals-6192a5294",
  },
  {
    id: "digitales",
    no: "05",
    title: "Digitales — College Figma Project",
    role: "UI/UX Designer",
    year: "College",
    medium: "Figma prototype · UI system",
    desc: "A full Figma design assignment — interactive prototype exploring layout, typography and premium editorial UI.",
    href: "https://www.figma.com/proto/1CYfuXc2fFtT2doEhLSBce/FIGMA-FILE-ASSIGNMENT-_DIGITALES?node-id=16-40&page-id=0%3A1&t=uLYrHIyaW1qeK8eQ-1",
    thumb: lajjaThumb,
  },
];

function Projects() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"
    >
      <RoomHeader
        n="III"
        title="The Exhibits"
        sub="Selected works, hung chronologically"
      />
      <div className="grid gap-16">
        {EXHIBITS.map((ex, i) => (
          <Exhibit key={ex.id} exhibit={ex} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function Exhibit({ exhibit, flip }: { exhibit: Exhibit; flip: boolean }) {
  return (
    <Reveal>
      <article
        className={`grid gap-8 md:grid-cols-12 md:items-center ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        {/* Frame */}
        <div className="md:col-span-8">
          <Tilt>
            <a
              href={exhibit.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="visit ↗"
              className="group block overflow-hidden rounded-sm border-[10px] border-foreground bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 bg-background/60 px-4 py-2 text-xs">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-destructive/70" />
                  <span className="size-2.5 rounded-full bg-accent" />
                  <span className="size-2.5 rounded-full bg-secondary" />
                </div>
                <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono">
                  {new URL(exhibit.href).host}
                </span>
                <span className="opacity-50">live ↗</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-background">
                {exhibit.thumb ? (
                  <img
                    src={exhibit.thumb}
                    alt={exhibit.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : exhibit.liveEmbed ? (
                  <iframe
                    src={exhibit.href}
                    title={exhibit.title}
                    loading="lazy"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 scale-[0.62] origin-center transition-transform duration-700 group-hover:scale-[0.65]"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary to-accent">
                    <span className="text-6xl font-bold uppercase tracking-tight text-background">
                      {exhibit.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-foreground/40 via-transparent to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-2xl font-bold uppercase text-background">
                    View the exhibit
                  </p>
                  <span className="rounded-full bg-background px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground">
                    Open ↗
                  </span>
                </div>
              </div>
            </a>
          </Tilt>
        </div>

        {/* Museum wall label */}
        <div className="md:col-span-4">
          <div className="border-l-4 border-accent bg-card p-6 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Exhibit № {exhibit.no}
            </p>
            <h3 className="mt-3 text-3xl font-bold uppercase leading-tight">
              {exhibit.title}
            </h3>
            <p className="mt-3 text-sm">
              <span className="text-muted-foreground">Role: </span>
              {exhibit.role}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Year: </span>
              {exhibit.year}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Medium: </span>
              {exhibit.medium}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {exhibit.desc}
            </p>
            <a
              href={exhibit.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="visit"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-accent"
            >
              Visit exhibit <span>↗</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary text-primary-foreground grain"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex items-center gap-6">
          <div className="grid size-14 place-items-center rounded-full border border-primary-foreground text-sm font-bold">
            IV
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] opacity-70">
              Room IV
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl">
              The Guestbook
            </h2>
          </div>
        </div>

        <Reveal>
          <h3 className="text-[11vw] font-bold uppercase leading-[0.9] md:text-[8rem]">
            Let's build <span className="text-accent">something human.</span>
          </h3>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Magnetic>
              <a
                href="mailto:shalmaleeraje1028@gmail.com"
                data-cursor="email"
                className="inline-flex items-center gap-4 rounded-full bg-accent px-8 py-5 text-accent-foreground transition-shadow hover:shadow-[var(--shadow-glow)]"
              >
                <span className="text-xl font-semibold">
                  shalmaleeraje1028@gmail.com
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-accent-foreground/10">
                  ↗
                </span>
              </a>
            </Magnetic>
          </Reveal>
          <div className="md:col-span-5 space-y-4 self-end">
            <Row k="Phone" v="+91 99756 59251" />
            <Row k="Location" v="Pune, Maharashtra" />
            <Row k="Availability" v="Open to UI/UX roles · 2026" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <Reveal>
      <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
        <span className="text-xs uppercase tracking-[0.25em] opacity-60">
          {k}
        </span>
        <span className="text-lg font-semibold">{v}</span>
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-sm uppercase tracking-[0.25em] font-bold">
          Shalmalee Raje · UI/UX Developer
        </p>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          © 2026 — The Museum closes at midnight.
        </p>
      </div>
    </footer>
  );
}
