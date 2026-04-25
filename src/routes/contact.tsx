import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Send, Instagram, Youtube, Twitter, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().trim().min(10, "Tell me a bit more about the project").max(1000),
});

type FormState = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

const projectTypes = ["Short Film", "Music Video", "Commercial / Ad", "Social Content", "Other"];

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setForm({ name: "", email: "", projectType: "", message: "" });
  };

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="relative pt-32 pb-24">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 h-96 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.2 30 / 0.25), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Contact me</span>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight">
            Let's make something <span className="text-gradient-primary">cinematic</span>.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Tell me about your project — I usually reply within 24 hours.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 md:p-10 shadow-elegant">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-primary to-accent mx-auto">
                    <CheckCircle2 className="size-8 text-primary-foreground" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold">Message sent</h2>
                  <p className="mt-2 text-muted-foreground">
                    Thanks for reaching out. I'll get back to you very soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex rounded-full glass px-6 py-2.5 text-sm hover:bg-secondary"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        maxLength={100}
                        className="w-full rounded-xl bg-background/50 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@studio.com"
                        maxLength={255}
                        className="w-full rounded-xl bg-background/50 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </Field>
                  </div>

                  <Field label="Project type" error={errors.projectType}>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => update("projectType", type)}
                          className={`rounded-full px-4 py-2 text-xs transition-all border ${
                            form.projectType === type
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent shadow-glow"
                              : "border-border bg-background/40 hover:bg-secondary"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Tell me about it" error={errors.message}>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      placeholder="I have a 3-minute short film that needs full VFX and color..."
                      maxLength={1000}
                      className="w-full rounded-xl bg-background/50 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                  >
                    <Send className="size-4" />
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-3xl p-6 shadow-elegant">
              <h3 className="font-semibold">Direct contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary shrink-0">
                    <Mail className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href="mailto:talhaavaan@gmail.com" className="hover:text-primary">
                      talhaavaan@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary shrink-0">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Based in</p>
                    <p>Available worldwide · Remote</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass rounded-3xl p-6 shadow-elegant">
              <h3 className="font-semibold">Follow the work</h3>
              <div className="mt-4 flex gap-3">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/talhaavaan/", label: "Instagram" },
                  { Icon: Youtube, href: "https://www.youtube.com/@talhaavaan", label: "YouTube" },
                  { Icon: Twitter, href: "https://x.com/talhaavaan", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-11 place-items-center rounded-full bg-secondary hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:text-primary-foreground transition-all"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-elegant">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-medium">Currently accepting projects</p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Booking for next month — limited slots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}
