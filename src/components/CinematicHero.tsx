"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { Play, Sparkles, Film, Layers, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #2a1208 0%, #0A0608 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 200, 120, 0.08) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .device-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
      pointer-events: none;
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.4),
          inset 0 1px 1px rgba(255,255,255,0.06),
          inset 0 -1px 1px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.04);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* === MOBILE PERFORMANCE === */
  @media (max-width: 767px) {
    /* Show all content immediately — no GSAP hiding on mobile */
    .gsap-reveal { visibility: visible !important; }
    /* Kill expensive backdrop blurs */
    .floating-ui-badge {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(255,255,255,0.07);
    }
    /* Flat transforms on mobile — no 3D */
    .device-bezel { transform-style: flat !important; }
    /* Hide the grid bg — it's a paint cost */
    .bg-grid-theme { display: none; }
    /* Kill box-shadow depth on mobile card */
    .premium-depth-card { box-shadow: 0 8px 32px rgba(0,0,0,0.7); }
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover { transform: translateY(-3px); }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover { transform: translateY(-3px); }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Talha Avaan",
  tagline1 = "Crafting frames that",
  tagline2 = "move you.",
  cardHeading = "Cinematic VFX, end-to-end.",
  cardDescription = (
    <>
      From invisible plate cleanups to explosive sci-fi spectacle — Talha
      sculpts every frame with a director's eye and a colorist's care.
    </>
  ),
  metricValue = 120,
  metricLabel = "Shots Delivered",
  ctaHeading = "Have a frame in mind?",
  ctaDescription = "Let's turn your footage into something cinematic — book a free creative call.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<number>(0);

  // 1. Mouse interaction — desktop only (skipped on mobile for perf)
  useEffect(() => {
    if (isMobileDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
            transformPerspective: 1200,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Scroll timeline — desktop only
  useEffect(() => {
    if (isMobileDevice()) return;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-reveal", {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"],
        { autoAlpha: 0 },
      );
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-reveal",
          {
            duration: 1.4,
            clipPath: "inset(0 0% 0 0)",
            ease: "power4.inOut",
          },
          "-=1.0",
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          [".hero-text-wrapper", ".bg-grid-theme"],
          {
            scale: 1.15,
            filter: "blur(20px)",
            opacity: 0.2,
            ease: "power2.inOut",
            duration: 2,
          },
          0,
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "expo.out",
            duration: 2.5,
          },
          "-=0.8",
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            duration: 1.5,
          },
          "-=1.5",
        )
        .to(
          ".progress-ring",
          { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" },
          "-=1.2",
        )
        .to(
          { val: 0 },
          {
            val: metricValue,
            duration: 2,
            ease: "power3.inOut",
            onUpdate() {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.floor(this.targets()[0].val),
                );
              }
            },
          },
          "-=2",
        )
        .fromTo(
          [".card-left-text", ".card-right-text"],
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.2, ease: "power3.out", duration: 1.5 },
          "-=1.5",
        )
        .fromTo(
          ".floating-badge",
          { y: 30, autoAlpha: 0, scale: 0.9 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.4)",
            duration: 1.2,
          },
          "-=1",
        )
        .to({}, { duration: 2 })
        .to(
          [
            ".card-left-text",
            ".card-right-text",
            ".mockup-scroll-wrapper",
            ".floating-badge",
          ],
          {
            autoAlpha: 0,
            scale: 0.85,
            filter: "blur(12px)",
            y: -30,
            ease: "power3.inOut",
            duration: 1.6,
          },
        )
        .to(
          ".cta-wrapper",
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "expo.out",
            duration: 1.8,
          },
          "-=0.6",
        )
        .to({}, { duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  // A simple, performant static layout shown instead of the GSAP cinematic hero
  const MobileHero = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-24 pb-16 bg-background overflow-hidden">
      {/* Subtle gradient orbs — cheaper than blur-heavy grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.22 285), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.2 30), transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="size-3 text-primary" />
          VFX Editor & Motion Designer
        </div>

        {/* Name */}
        <h1 className="text-5xl font-bold tracking-tight leading-none text-3d-matte">
          {brandName}
        </h1>

        {/* Tagline */}
        <h2 className="text-3xl font-bold tracking-tight leading-tight max-w-xs">
          <span className="block text-silver-matte">{tagline1}</span>
          <span className="block text-gradient-primary mt-1">{tagline2}</span>
        </h2>

        {/* Stat pills */}
        <div className="flex gap-3 flex-wrap justify-center mt-2">
          {[
            { value: "7+", label: "Years" },
            { value: `${metricValue}+`, label: metricLabel },
            { value: "40+", label: "Studios" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center min-w-[80px]">
              <div className="text-xl font-bold text-card-silver-matte">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
          <Link
            to="/work"
            className="btn-modern-light inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold w-full"
          >
            <Play className="size-4 fill-current" />
            Watch Showreel
          </Link>
          <Link
            to="/contact"
            className="btn-modern-dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold w-full"
          >
            Start a project →
          </Link>
        </div>

        {/* Card preview */}
        <div className="mt-6 w-full max-w-sm premium-depth-card rounded-3xl overflow-hidden">
          <div className="relative p-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/70 border border-white/10 bg-white/5 mb-4">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Available for Projects
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-card-silver-matte leading-tight">
              {cardHeading}
            </h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              {cardDescription}
            </p>
            <div className="mt-5 flex gap-2 flex-wrap">
              {[
                { icon: Film, label: "Edits" },
                { icon: Wand2, label: "VFX" },
                { icon: Layers, label: "Comp" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="widget-depth rounded-xl px-3 py-2 flex items-center gap-1.5">
                  <Icon className="size-3.5 text-primary" />
                  <span className="text-[10px] uppercase tracking-wider text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-6 w-full max-w-sm premium-depth-card rounded-3xl p-6 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-card-silver-matte">{ctaHeading}</h3>
          <p className="mt-2 text-sm text-white/60">{ctaDescription}</p>
          <Link
            to="/contact"
            className="mt-5 btn-modern-light inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold w-full"
          >
            Book a free call →
          </Link>
        </div>
      </div>
    </div>
  );

  // ── DESKTOP LAYOUT (original cinematic) ───────────────────────────────────
  const DesktopHero = () => (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-screen overflow-hidden bg-background",
        className,
      )}
      {...props}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-theme" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30"
        style={{ background: "oklch(0.55 0.22 285)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30"
        style={{ background: "oklch(0.72 0.2 30)" }}
      />

      {/* HERO TEXT (intro) */}
      <div className="hero-text-wrapper absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="text-track gsap-reveal inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          <Sparkles className="size-3 text-primary" />
          VFX Editor & Motion Designer
        </div>
        <h1 className="text-track gsap-reveal text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-3d-matte">
          {brandName}
        </h1>
        <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-4xl">
          <span className="text-track gsap-reveal block text-silver-matte">
            {tagline1}
          </span>
          <span className="text-reveal gsap-reveal block text-gradient-primary mt-2">
            {tagline2}
          </span>
        </h2>
        <p className="text-track gsap-reveal mt-8 max-w-xl text-base md:text-lg text-muted-foreground">
          Scroll to explore the craft.
        </p>
      </div>

      {/* MAIN PREMIUM CARD (rises on scroll) */}
      <div
        ref={mainCardRef}
        className="main-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] h-[80vh] max-w-7xl rounded-[40px] premium-depth-card overflow-hidden z-20"
      >
        <div className="card-sheen" />

        <div className="relative h-full w-full flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-12 lg:p-20">
          {/* Left text */}
          <div className="card-left-text gsap-reveal flex-1 max-w-md text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/70 floating-ui-badge mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Available for Projects
            </div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-card-silver-matte leading-tight">
              {cardHeading}
            </h3>
            <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">
              {cardDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/work"
                className="btn-modern-light inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                <Play className="size-4 fill-current" />
                Watch Showreel
              </Link>
              <Link
                to="/contact"
                className="btn-modern-dark inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Start a project →
              </Link>
            </div>
          </div>

          {/* Device mockup */}
          <div
            className="mockup-scroll-wrapper gsap-reveal flex-1 flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            <div
              ref={mockupRef}
              className="relative device-bezel rounded-[44px] w-[280px] md:w-[320px] aspect-[9/19] overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-6 w-24 rounded-full bg-black" />
              <div className="screen-glare absolute inset-0 z-20" />

              <div className="absolute inset-[7px] rounded-[36px] overflow-hidden bg-gradient-to-br from-[#1a0f1f] via-[#0f0a14] to-[#0a0608]">
                <img
                  src="/Assests/pfp/1.png"
                  alt="Showreel still"
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative h-full w-full flex flex-col p-5 pt-12 text-white">
                  <div className="phone-widget gsap-reveal text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Now Playing
                  </div>
                  <div className="phone-widget gsap-reveal mt-1 text-lg font-bold leading-tight">
                    Showreel · 2025
                  </div>

                  <div className="phone-widget gsap-reveal relative mx-auto mt-6 grid place-items-center">
                    <svg width="160" height="160" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                      <circle className="progress-ring" cx="80" cy="80" r="64" fill="none" stroke="url(#ringGrad)" strokeWidth="8" />
                      <defs>
                        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="oklch(0.78 0.22 45)" />
                          <stop offset="100%" stopColor="oklch(0.55 0.22 285)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-card-silver-matte leading-none">
                          <span ref={counterRef}>0</span>
                          <span className="text-xl">+</span>
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/50">
                          {metricLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-3 gap-2">
                    {[
                      { icon: Film, label: "Edits" },
                      { icon: Wand2, label: "VFX" },
                      { icon: Layers, label: "Comp" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="phone-widget gsap-reveal widget-depth rounded-xl p-2 text-center">
                        <Icon className="mx-auto size-3.5 text-primary" />
                        <div className="mt-1 text-[9px] uppercase tracking-wider text-white/60">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right badges */}
          <div className="card-right-text gsap-reveal hidden lg:flex flex-col gap-4 max-w-[200px]">
            <div className="floating-badge gsap-reveal floating-ui-badge rounded-2xl p-4">
              <div className="text-2xl font-bold text-card-silver-matte">7+</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/60">Years Experience</div>
            </div>
            <div className="floating-badge gsap-reveal floating-ui-badge rounded-2xl p-4">
              <div className="text-2xl font-bold text-card-silver-matte">40+</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/60">Studios & Brands</div>
            </div>
            <div className="floating-badge gsap-reveal floating-ui-badge rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-[11px] text-white/80">Online now</div>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">Replies in ~2h</div>
            </div>
          </div>
        </div>

        {/* CTA overlay */}
        <div className="cta-wrapper gsap-reveal absolute inset-0 grid place-items-center z-40 pointer-events-none">
          <div className="text-center max-w-2xl px-6 pointer-events-auto">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-card-silver-matte">
              {ctaHeading}
            </h3>
            <p className="mt-4 text-base md:text-lg text-white/60">{ctaDescription}</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/contact" className="btn-modern-light inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                Start a project →
              </Link>
              <Link to="/work" className="btn-modern-dark inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                <Play className="size-4 fill-current" />
                Showreel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      {/* Show mobile layout on small screens, desktop on md+ */}
      <div className="md:hidden">
        <MobileHero />
      </div>
      <div className="hidden md:block">
        <DesktopHero />
      </div>
    </>
  );
}
