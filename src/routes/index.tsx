import { createFileRoute, Link } from "@tanstack/react-router";
import { CinematicHero } from "@/components/CinematicHero";
import { TestimonialStack, type Testimonial } from "@/components/ui/glass-testimonial-swiper";
import { Film, Wand2, Palette, Sparkles, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    icon: Wand2,
    title: "Visual Effects",
    desc: "Compositing, CGI integration, sky replacements, particle FX & invisible cleanups.",
  },
  {
    icon: Film,
    title: "Cinematic Editing",
    desc: "Story-first edits with rhythm, emotion and pacing tuned for impact.",
  },
  {
    icon: Palette,
    title: "Color Grading",
    desc: "Cinematic looks, LUT design and consistent grade across every shot.",
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    desc: "Title sequences, kinetic typography and dynamic graphics for trailers.",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    initials: "AR",
    name: "Aiden Reyes",
    role: "Director — Volt Films",
    quote:
      "Talha turned our raw footage into a cinematic experience. His VFX work elevated the entire short — he sees frames the way directors do.",
    tags: [
      { text: "FEATURED", type: "featured" },
      { text: "Short Film", type: "default" },
    ],
    stats: [
      { icon: Award, text: "Festival Selection" },
      { icon: Clock, text: "3 weeks delivery" },
    ],
    avatarGradient: "linear-gradient(135deg, #f97316, #db2777)",
  },
  {
    id: 2,
    initials: "MK",
    name: "Mira Khan",
    role: "Music Video Producer",
    quote:
      "Insanely creative and fast. The particle work and color grade Talha delivered for our music video got us 2M+ views in the first week.",
    tags: [{ text: "Music Video", type: "default" }],
    stats: [
      { icon: Sparkles, text: "2M+ views" },
      { icon: Clock, text: "10 days" },
    ],
    avatarGradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  {
    id: 3,
    initials: "JS",
    name: "Jordan Steele",
    role: "Creative Director — Arc House",
    quote:
      "Talha's compositing is invisible — and that's the highest compliment. He fixed plates we thought were unusable. A true editor's editor.",
    tags: [
      { text: "FEATURED", type: "featured" },
      { text: "Commercial", type: "default" },
    ],
    stats: [
      { icon: Award, text: "Brand campaign" },
      { icon: Film, text: "12 shots" },
    ],
    avatarGradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
  {
    id: 4,
    initials: "LP",
    name: "Lena Park",
    role: "Indie Filmmaker",
    quote:
      "He treated my indie short like a blockbuster. Patient, collaborative, and his eye for detail made every shot sing.",
    tags: [{ text: "Indie", type: "default" }],
    stats: [
      { icon: Sparkles, text: "Award-winning" },
      { icon: Clock, text: "4 weeks" },
    ],
    avatarGradient: "linear-gradient(135deg, #10b981, #059669)",
  },
];

function Index() {
  return (
    <div>
      <CinematicHero />

      {/* Services */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">What I do</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Crafted with <span className="text-gradient-primary">precision</span>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From subtle invisible fixes to full-blown sci-fi spectacle, every project
              is treated with cinematic care.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground transition-colors">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.22 285 / 0.2), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Kind words
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              From directors & creators
            </h2>
          </div>
          <TestimonialStack testimonials={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-16 text-center shadow-elegant">
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Have a frame in mind?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Let's turn your footage into something cinematic.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Start a project →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
