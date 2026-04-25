import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
  type ComponentType,
  type SVGProps,
} from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: "featured" | "default" }[];
  stats: { icon: ComponentType<SVGProps<SVGSVGElement>>; text: string }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({
  testimonials,
  visibleBehind = 2,
}: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback(
    (newIndex: number) => {
      setActiveIndex((newIndex + totalCards) % totalCards);
    },
    [totalCards],
  );

  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    index: number,
  ) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setDragOffset(clientX - dragStartRef.current);
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[420px] sm:h-[380px]">
      {testimonials.map((testimonial, index) => {
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        const style: CSSProperties = {
          transition: isDragging && displayOrder === 0
            ? "none"
            : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
        };
        if (displayOrder === 0) {
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) {
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -1.5 * displayOrder;
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.25 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else {
          style.transform = "scale(0.6)";
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClass = (type: "featured" | "default") =>
          type === "featured"
            ? "bg-primary/20 text-primary border border-primary/30"
            : "bg-secondary text-secondary-foreground border border-border";

        return (
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            key={testimonial.id}
            className="absolute inset-0 glass rounded-3xl p-6 sm:p-8 cursor-grab active:cursor-grabbing shadow-elegant select-none"
            style={style}
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-14 w-14 place-items-center rounded-full font-bold text-white shadow-glow"
                  style={{ background: testimonial.avatarGradient }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base sm:text-lg text-foreground/90 leading-relaxed flex-1">
                "{testimonial.quote}"
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        tagClass(tag.type),
                      )}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {testimonial.stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <span key={i} className="inline-flex items-center gap-1">
                        <Icon className="size-3.5" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => navigate(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              activeIndex === index
                ? "w-8 bg-primary"
                : "w-1.5 bg-muted-foreground/40",
            )}
          />
        ))}
      </div>
    </div>
  );
};
