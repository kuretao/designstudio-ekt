"use client";

import { useEffect, useMemo, useState } from "react";

type CinematicImageProps = {
  frames: Array<string | undefined>;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  hint?: string;
};

export default function CinematicImage({
  frames,
  alt,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  hint = "motion",
}: CinematicImageProps) {
  const [activeFrame, setActiveFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState<Set<number>>(() => new Set([0]));

  const cleanFrames = useMemo(
    () => Array.from(new Set(frames.filter((frame): frame is string => Boolean(frame)))),
    [frames],
  );

  useEffect(() => {
    setActiveFrame(0);
    setLoadedFrames(new Set([0]));
  }, [cleanFrames]);

  useEffect(() => {
    if (!playing || cleanFrames.length < 2 || loadedFrames.size < 2) return;

    const interval = window.setInterval(() => {
      setActiveFrame((current) => {
        const readyFrames = Array.from(loadedFrames).sort((a, b) => a - b);
        const currentReadyIndex = readyFrames.indexOf(current);
        return readyFrames[(currentReadyIndex + 1) % readyFrames.length] ?? 0;
      });
    }, 1800);

    return () => window.clearInterval(interval);
  }, [cleanFrames.length, loadedFrames, playing]);

  if (!cleanFrames.length) return null;

  const stop = () => {
    setPlaying(false);
    window.setTimeout(() => setActiveFrame(0), 220);
  };

  return (
    <div
      className={`cinematic-image group/cinema relative overflow-hidden ${className}`}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={stop}
      onFocus={() => setPlaying(true)}
      onBlur={stop}
    >
      {cleanFrames.map((frame, index) => (
        <img
          key={frame}
          src={frame}
          alt={index === 0 ? alt : ""}
          aria-hidden={index !== 0}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => {
            setLoadedFrames((current) => {
              if (current.has(index)) return current;
              const next = new Set(current);
              next.add(index);
              return next;
            });
          }}
          className={`cinematic-frame absolute inset-0 h-full w-full object-cover transition duration-700 ease-out ${
            index === activeFrame ? "cinematic-frame-active opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      ))}

      <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      <div className="cinematic-sheen pointer-events-none absolute inset-0" />
      <div className="cinematic-scan pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/cinema:opacity-100 group-focus-within/cinema:opacity-100" />

      {cleanFrames.length > 1 && (
        <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#050505]/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/65 backdrop-blur transition duration-300 group-hover/cinema:border-[#D69A66]/55 group-hover/cinema:text-[#D69A66]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D69A66] opacity-55" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D69A66]" />
          </span>
          {hint}
        </div>
      )}
    </div>
  );
}
