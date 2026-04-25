import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Twitter, Mail, MapPin } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/talhaavaan/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@talhaavaan" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/talhaavaan" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.2 30 / 0.25), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                T
              </span>
              <span className="text-lg font-semibold">Talha Avaan</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Cinematic VFX editor crafting high-impact visuals for short films,
              music videos, ads and creators worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full glass hover:text-primary transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/work" className="hover:text-foreground">Work</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href="mailto:talhaavaan@gmail.com" className="hover:text-foreground">
                  talhaavaan@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>Available worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/50 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Talha Avaan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with cinematic precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
