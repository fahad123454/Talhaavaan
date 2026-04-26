"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <div
      className={cn("relative h-1 cursor-pointer rounded-full bg-white/20", className)}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-primary"
        style={{ width: `${value}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow"
        style={{ left: `${value}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number) => {
    if (!videoRef.current) return;
    const newVolume = value / 100;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(isFinite(p) ? p : 0);
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const time = (value / 100) * videoRef.current.duration;
    if (isFinite(time)) {
      videoRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    if (!isMuted) setVolume(0);
    else {
      setVolume(1);
      videoRef.current.volume = 1;
    }
  };

  const setSpeed = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-black group",
        className,
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        onLoadedMetadata={handleTimeUpdate}
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4"
          >
            <div className="flex items-center justify-between text-xs text-white mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <CustomSlider value={progress} onChange={handleSeek} className="mb-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                </Button>
                <div className="flex items-center gap-2">
                  <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                    {isMuted ? <VolumeX className="size-4" /> : volume > 0.5 ? <Volume2 className="size-4" /> : <Volume1 className="size-4" />}
                  </Button>
                  <div className="w-20 hidden sm:block">
                    <CustomSlider value={volume * 100} onChange={handleVolumeChange} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <Button
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 px-2 text-xs text-white hover:bg-white/10 hover:text-white",
                      playbackSpeed === speed && "bg-white/20",
                    )}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center bg-black/30 transition-opacity group-hover:bg-black/40"
          aria-label="Play"
        >
          <span className="grid size-16 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-transform hover:scale-110">
            <Play className="size-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
