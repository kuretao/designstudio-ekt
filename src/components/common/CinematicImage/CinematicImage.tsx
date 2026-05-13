type CinematicImageProps = {
  frames: Array<string | undefined>;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  hint?: string;
  fill?: boolean;
};

export default function CinematicImage({
  frames,
  alt,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  hint = "motion",
  fill = false,
}: CinematicImageProps) {
  const frameKey = frames.filter(Boolean).join("|");
  const cleanFrames = Array.from(new Set(frameKey.split("|").filter(Boolean)));
  const baseFrame = cleanFrames[0];

  if (!baseFrame) return null;

  return (
    <div
      className={`cinematic-image group/cinema overflow-hidden bg-cover bg-center ${
        fill ? "absolute inset-0" : "relative"
      } ${className}`}
      style={{ backgroundImage: `url(${baseFrame})` }}
    >
      <img
        src={baseFrame}
        alt={alt}
        loading="eager"
        decoding="async"
        className={`cinematic-frame cinematic-frame-base absolute inset-0 h-full w-full object-cover transition duration-500 ease-out ${imageClassName}`}
      />

      {cleanFrames.slice(1).map((frame, frameIndex) => {
        const index = frameIndex + 1;

        return (
        <img
          key={frame}
          src={frame}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`cinematic-frame cinematic-frame-layer cinematic-frame-layer-${index} absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 ease-out ${imageClassName}`}
        />
        );
      })}

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
