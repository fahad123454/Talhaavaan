import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Film, Sparkles, Users, MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const stats = [
  { value: "7+", label: "Years Experience", icon: Calendar },
  { value: "120+", label: "Projects Shipped", icon: Film },
  { value: "40+", label: "Happy Clients", icon: Users },
  { value: "12", label: "Awards & Selections", icon: Award },
];

const skills = [
  "After Effects", "DaVinci Resolve", "Premiere Pro", "Nuke",
  "Cinema 4D", "Houdini (FX)", "Color Grading", "Compositing",
  "Motion Design", "Sound Design",
];

const timeline = [
  {
    year: "2024 — Now",
    title: "Independent VFX Editor",
    desc: "Collaborating with directors, agencies and creators worldwide on cinematic projects.",
  },
  {
    year: "2021 — 2024",
    title: "Senior Editor at Nebula Studios",
    desc: "Led VFX & post-production on award-winning short films and global brand campaigns.",
  },
  {
    year: "2018 — 2021",
    title: "Motion Designer at Volt Films",
    desc: "Crafted title sequences, motion graphics and visual effects for music videos and trailers.",
  },
  {
    year: "2017",
    title: "Started the journey",
    desc: "Fell in love with the craft after editing my first short — never looked back.",
  },
];

function AboutPage() {
  return (
    <div className="relative pt-32 pb-24">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">About me</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-gradient-primary">Talha</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I'm a VFX editor and motion designer with over 7 years of experience
              turning raw footage into cinematic stories. From invisible cleanups
              to explosive sci-fi shots, I treat every frame like it matters —
              because it does.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I work closely with directors, agencies and indie creators to find
              the visual language that serves the story. The tools change, the
              craft doesn't.
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Available worldwide
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Open to projects
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                See my work
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
              <img
                src="/Assests/pfp/2.png"
                alt="Talha Avaan editing on a multi-monitor setup"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-elegant max-w-xs hidden sm:block">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Currently</p>
              <p className="mt-1 text-sm font-semibold">Editing a sci-fi short for Nebula Studios</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center">
              <Icon className="size-5 text-primary mx-auto" />
              <div className="mt-3 text-3xl md:text-4xl font-bold text-gradient-primary">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Toolkit</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Tools I work with</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full glass px-5 py-2 text-sm hover:bg-secondary transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Journey</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">A short timeline</h2>
          <div className="mt-10 relative border-l border-border/60 pl-8 space-y-10">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-[42px] top-1.5 grid size-5 place-items-center rounded-full bg-gradient-to-br from-primary to-accent ring-4 ring-background" />
                <div className="text-xs uppercase tracking-widest text-primary">{item.year}</div>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
