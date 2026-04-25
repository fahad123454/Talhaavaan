import { createFileRoute } from "@tanstack/react-router";
import VideoPlayer from "@/components/ui/video-player";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Talha Avaan VFX Showcase" },
      {
        name: "description",
        content:
          "Selected VFX, motion design and color grading work by Talha Avaan — short films, music videos, commercials and more.",
      },
      { property: "og:title", content: "Work — Talha Avaan VFX Showcase" },
      {
        property: "og:description",
        content: "Selected cinematic VFX, motion and color projects.",
      },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1518930259200-3e5b4fdd8e29?w=1600&q=80",
      },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    title: "Dholki Night",
    category: "function",
    desc: "A lively dholki night with music, color, and pure desi vibes..",
    src: "/Assests/1.mp4",
    poster: "https://images.unsplash.com/photo-1518930259200-3e5b4fdd8e29?w=1600&q=80",
    tags: ["VFX", "Compositing", "Film"],
  },
  {
    title: "Fecha",
    category: "Brand Video",
    desc: "Color grading, kinetic typography and dynamic motion design across 80+ shots.",
    src: "/Assests/2.mp4",
    poster: "",
    tags: ["Motion", "Brand", "Grade"],
  },
  {
    title: "Zone Kithcen",
    category: "Brand Video",
    desc: "A sizzling brand video capturing Zone Kitchen’s flavor, energy, and vibe.",
    src: "/Assests/3.mp4",
    poster: "",
    tags: ["VFX", "Grade", "Fashion"],
  },
  {
    title: "Property Showcase Editing",
    category: "Commercial",
    desc: "A clean, cinematic property video highlighting space, design, and lifestyle to attract buyers.",
    src: "public/Assests/4.mp4",
    poster: "",
    tags: ["Sci-Fi", "Particles", "Compositing"],
  },
];

function WorkPage() {
  return (
    <div className="relative pt-32 pb-24">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Selected work</span>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight">
            The <span className="text-gradient-primary">Showcase</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            A handful of recent projects across short films, music videos and brand work.
          </p>
        </div>

        <div className="mt-16 grid gap-12">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`grid gap-8 md:grid-cols-5 md:items-center ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-3">
                <VideoPlayer
                  src={project.src}
                  poster={project.poster}
                  className="aspect-video shadow-elegant"
                />
              </div>
              <div className="md:col-span-2">
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  {project.category}
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {project.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full glass px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}