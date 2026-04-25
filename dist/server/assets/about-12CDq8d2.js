import { T as jsxRuntimeExports } from "./worker-entry-uGdKt4ZC.js";
import { c as createLucideIcon, a as MapPin, L as Link } from "./router-dB92ARKD.js";
import { S as Sparkles, F as Film, A as Award } from "./sparkles-D47bPKme.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const stats = [{
  value: "7+",
  label: "Years Experience",
  icon: Calendar
}, {
  value: "120+",
  label: "Projects Shipped",
  icon: Film
}, {
  value: "40+",
  label: "Happy Clients",
  icon: Users
}, {
  value: "12",
  label: "Awards & Selections",
  icon: Award
}];
const skills = ["After Effects", "DaVinci Resolve", "Premiere Pro", "Nuke", "Cinema 4D", "Houdini (FX)", "Color Grading", "Compositing", "Motion Design", "Sound Design"];
const timeline = [{
  year: "2024 — Now",
  title: "Independent VFX Editor",
  desc: "Collaborating with directors, agencies and creators worldwide on cinematic projects."
}, {
  year: "2021 — 2024",
  title: "Senior Editor at Nebula Studios",
  desc: "Led VFX & post-production on award-winning short films and global brand campaigns."
}, {
  year: "2018 — 2021",
  title: "Motion Designer at Volt Films",
  desc: "Crafted title sequences, motion graphics and visual effects for music videos and trailers."
}, {
  year: "2017",
  title: "Started the journey",
  desc: "Fell in love with the craft after editing my first short — never looked back."
}];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-32 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 grid-bg opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-2 md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "About me" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 text-5xl md:text-6xl font-bold tracking-tight", children: [
            "Hi, I'm ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Talha" }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground leading-relaxed", children: "I'm a VFX editor and motion designer with over 7 years of experience turning raw footage into cinematic stories. From invisible cleanups to explosive sci-fi shots, I treat every frame like it matters — because it does." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "I work closely with directors, agencies and indie creators to find the visual language that serves the story. The tools change, the craft doesn't." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-4 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary" }),
              " Available worldwide"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-primary" }),
              " Open to projects"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/work", className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow", children: "See my work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-secondary", children: "Get in touch" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/Assests/pfp/2.png", alt: "Talha Avaan editing on a multi-monitor setup", className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-elegant max-w-xs hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Currently" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold", children: "Editing a sci-fi short for Nebula Studios" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-24 grid grid-cols-2 md:grid-cols-4 gap-4", children: stats.map(({
        value,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-primary mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-3xl md:text-4xl font-bold text-gradient-primary", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Toolkit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-4xl font-bold", children: "Tools I work with" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full glass px-5 py-2 text-sm hover:bg-secondary transition-colors", children: skill }, skill)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl md:text-4xl font-bold", children: "A short timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 relative border-l border-border/60 pl-8 space-y-10", children: timeline.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[42px] top-1.5 grid size-5 place-items-center rounded-full bg-gradient-to-br from-primary to-accent ring-4 ring-background" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-primary", children: item.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-semibold", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-2xl", children: item.desc })
        ] }, item.year)) })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
