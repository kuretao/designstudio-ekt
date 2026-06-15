"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type TourSceneId = "living" | "bedroom" | "hall";

type TourScene = {
  id: TourSceneId;
  title: string;
  shortTitle: string;
  panorama: string;
  yaw: number;
  pitch: number;
  plan: { x: number; y: number };
  next: {
    id: TourSceneId;
    text: string;
    yaw: number;
    pitch: number;
    targetYaw?: number;
  }[];
};

type PannellumViewer = {
  loadScene: (sceneId: string, pitch?: number, yaw?: number, hfov?: number) => void;
  destroy: () => void;
  on?: (event: string, handler: (sceneId: string) => void) => void;
  toggleFullscreen?: () => void;
};

type PannellumApi = {
  viewer: (
    container: HTMLElement,
    config: Record<string, unknown>,
  ) => PannellumViewer;
};

type WindowWithPannellum = Window & { pannellum?: PannellumApi };

function getPannellum() {
  return (window as WindowWithPannellum).pannellum;
}

function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}

function loadPannellumScript() {
  const api = getPannellum();
  if (api) return Promise.resolve(api);

  return new Promise<PannellumApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-pannellum="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        const api = getPannellum();
        if (api) resolve(api);
        else reject(new Error("Pannellum script loaded without API"));
      });
      existingScript.addEventListener("error", () =>
        reject(new Error("Pannellum script failed to load")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = withBasePath("/vendor/pannellum/pannellum.js");
    script.async = true;
    script.dataset.pannellum = "true";
    script.onload = () => {
      const api = getPannellum();
      if (api) resolve(api);
      else reject(new Error("Pannellum script loaded without API"));
    };
    script.onerror = () =>
      reject(new Error("Pannellum script failed to load"));
    document.body.appendChild(script);
  });
}

const scenes: TourScene[] = [
  {
    id: "living",
    title: "Гостиная зона",
    shortTitle: "Гостиная",
    panorama: "/panoramas/demo-house-living.jpg",
    yaw: 95,
    pitch: -2,
    plan: { x: 32, y: 58 },
    next: [
      { id: "hall", text: "Холл", yaw: 144, pitch: -4, targetYaw: 12 },
      { id: "bedroom", text: "Спальня", yaw: 62, pitch: -3, targetYaw: -92 },
    ],
  },
  {
    id: "hall",
    title: "Холл и переход",
    shortTitle: "Холл",
    panorama: "/panoramas/demo-house-hall.jpg",
    yaw: 8,
    pitch: -2,
    plan: { x: 55, y: 42 },
    next: [
      { id: "living", text: "Гостиная", yaw: -72, pitch: -3, targetYaw: 116 },
      { id: "bedroom", text: "Спальня", yaw: 88, pitch: -2, targetYaw: -18 },
    ],
  },
  {
    id: "bedroom",
    title: "Спальня",
    shortTitle: "Спальня",
    panorama: "/panoramas/demo-house-bedroom.jpg",
    yaw: -52,
    pitch: -4,
    plan: { x: 73, y: 64 },
    next: [
      { id: "hall", text: "Холл", yaw: -132, pitch: -5, targetYaw: 22 },
      { id: "living", text: "Гостиная", yaw: 154, pitch: -2, targetYaw: 95 },
    ],
  },
];

const sceneById = new Map(scenes.map((scene) => [scene.id, scene]));

export default function VirtualTourAppPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<TourSceneId>("living");
  const [viewerReady, setViewerReady] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);
  const [planOpen, setPlanOpen] = useState(true);
  const activeScene = sceneById.get(activeSceneId) ?? scenes[0];

  const pannellumConfig = useMemo(
    () => ({
      default: {
        firstScene: "living",
        sceneFadeDuration: 900,
        autoLoad: true,
        showControls: true,
        compass: true,
        hfov: 102,
        minHfov: 52,
        maxHfov: 118,
        keyboardZoom: true,
        mouseZoom: true,
      },
      scenes: Object.fromEntries(
        scenes.map((scene) => [
          scene.id,
          {
            title: scene.title,
            type: "equirectangular",
            panorama: withBasePath(scene.panorama),
            yaw: scene.yaw,
            pitch: scene.pitch,
            hotSpots: scene.next.map((link) => ({
              type: "scene",
              text: link.text,
              sceneId: link.id,
              yaw: link.yaw,
              pitch: link.pitch,
              targetYaw: link.targetYaw,
              cssClass: "virtual-tour-hotspot",
            })),
          },
        ]),
      ),
    }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!containerRef.current) return;

      try {
        const pannellum = await loadPannellumScript();
        if (!mounted || !containerRef.current) return;

        const viewer = pannellum.viewer(
          containerRef.current,
          pannellumConfig,
        ) as PannellumViewer;

        viewerRef.current = viewer;
        viewer.on?.("scenechange", (sceneId: string) => {
          if (sceneById.has(sceneId as TourSceneId)) {
            setActiveSceneId(sceneId as TourSceneId);
          }
        });
        setViewerReady(true);
      } catch (error) {
        console.error("Virtual tour app failed to initialize", error);
        setViewerError("Не удалось запустить 360° просмотр");
      }
    };

    init();

    return () => {
      mounted = false;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [pannellumConfig]);

  const loadScene = (sceneId: TourSceneId) => {
    const target = sceneById.get(sceneId);
    if (!target) return;

    setActiveSceneId(sceneId);
    viewerRef.current?.loadScene(sceneId, target.pitch, target.yaw, 102);
  };

  const toggleBrowserFullscreen = () => {
    const root = document.documentElement;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    root.requestFullscreen?.();
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-black text-white">
      <div ref={containerRef} className="absolute inset-0" data-native-scroll />

      {!viewerReady && !viewerError && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#050505]">
          <div className="text-center">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-[#D69A66]/24 border-t-[#D69A66]" />
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">
              Загрузка тура
            </p>
          </div>
        </div>
      )}

      {viewerError && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#050505] p-6 text-center">
          <div>
            <p className="text-2xl font-light">{viewerError}</p>
            <Link
              href="/virtualnyj-3d-tur-360"
              className="mt-6 inline-flex rounded-full border border-white/18 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-[#D69A66] hover:text-white"
            >
              Вернуться
            </Link>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.58),transparent_24%,transparent_68%,rgba(0,0,0,.72))]" />

      <div className="pointer-events-auto absolute left-4 right-4 top-4 z-30 flex flex-wrap items-center justify-between gap-3 md:left-6 md:right-6">
        <div className="flex items-center gap-3 rounded-full border border-white/14 bg-black/38 px-4 py-3 backdrop-blur-xl">
          <Link
            href="/virtualnyj-3d-tur-360"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/8 text-lg leading-none transition hover:border-[#D69A66] hover:text-[#D69A66]"
            aria-label="Закрыть тур"
          >
            ×
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#D69A66]">
              3D Smart virtual tour
            </p>
            <h1 className="text-base font-light md:text-xl">
              Моковый дом / {activeScene.title}
            </h1>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPlanOpen((value) => !value)}
            className="rounded-full border border-white/14 bg-black/38 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/78 backdrop-blur-xl transition hover:border-[#D69A66] hover:text-white"
          >
            План
          </button>
          <button
            type="button"
            onClick={toggleBrowserFullscreen}
            className="rounded-full border border-white/14 bg-black/38 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/78 backdrop-blur-xl transition hover:border-[#D69A66] hover:text-white"
          >
            Fullscreen
          </button>
        </div>
      </div>

      {planOpen && (
        <div className="pointer-events-auto absolute bottom-28 right-4 z-30 w-[min(360px,calc(100vw-32px))] rounded-[1.4rem] border border-white/12 bg-black/46 p-4 shadow-[0_24px_90px_rgba(0,0,0,.38)] backdrop-blur-xl md:bottom-6 md:right-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-white/46">
              План дома
            </p>
            <span className="rounded-full bg-[#D69A66] px-3 py-1 text-xs text-[#050505]">
              {activeScene.shortTitle}
            </span>
          </div>
          <div className="relative h-64 overflow-hidden rounded-[1rem] border border-white/10 bg-[#111]">
            <div className="absolute inset-5 rounded-[1rem] border border-white/16" />
            <div className="absolute left-[12%] top-[46%] h-px w-[76%] bg-white/12" />
            <div className="absolute left-[49%] top-[14%] h-[72%] w-px bg-white/12" />
            <div className="absolute left-[22%] top-[22%] h-[42%] w-[36%] rounded-[0.8rem] border border-[#D69A66]/28 bg-[#D69A66]/8" />
            <div className="absolute right-[13%] top-[18%] h-[42%] w-[33%] rounded-[0.8rem] border border-white/16 bg-white/[0.035]" />
            <div className="absolute bottom-[15%] right-[17%] h-[28%] w-[38%] rounded-[0.8rem] border border-white/16 bg-white/[0.035]" />

            {scenes.map((scene, index) => {
              const active = scene.id === activeSceneId;

              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => loadScene(scene.id)}
                  className={`absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-sm transition ${
                    active
                      ? "border-[#D69A66] bg-[#D69A66] text-[#050505]"
                      : "border-white/24 bg-black/58 text-white hover:border-[#D69A66] hover:text-[#D69A66]"
                  }`}
                  style={{ left: `${scene.plan.x}%`, top: `${scene.plan.y}%` }}
                  aria-label={`Открыть ${scene.title}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-30 flex gap-2 overflow-x-auto pb-1 md:bottom-6 md:left-6 md:right-auto md:w-[min(720px,calc(100vw-440px))]">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => loadScene(scene.id)}
            className={`min-w-[170px] rounded-[1.15rem] border px-4 py-3 text-left backdrop-blur-xl transition ${
              scene.id === activeSceneId
                ? "border-[#D69A66]/70 bg-[#D69A66]/14"
                : "border-white/12 bg-black/36 hover:border-white/30"
            }`}
          >
            <span className="text-xs text-[#D69A66]">0{index + 1}</span>
            <span className="mt-2 block text-lg font-light">
              {scene.shortTitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
