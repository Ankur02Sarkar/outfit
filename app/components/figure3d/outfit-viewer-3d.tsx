import * as React from "react";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Loader2, Pause, Play, RotateCcw } from "lucide-react";

import { ClientOnly } from "~/components/ui/client-only";
import { cn } from "~/lib/utils";

export interface OutfitViewer3DProps {
  className?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  children?: React.ReactNode;
}

function ViewerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-paper-deep/60 to-paper/30 p-6 text-center select-none",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-card/30 to-transparent animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      <div className="relative flex flex-col items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full border border-hairline bg-card/80 shadow-xs">
          <Loader2 className="size-5 animate-spin text-brass" />
        </div>
        <div className="space-y-1">
          <p className="label-caps text-brass">The 3D Atelier</p>
          <p className="text-xs text-muted-foreground">Preparing tailored silhouette...</p>
        </div>
      </div>
    </div>
  );
}

function SceneStudio({
  controlsRef,
  children,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  children?: React.ReactNode;
}) {
  return (
    <>
      {/* Studio lighting tailored for quiet-luxury warm tones */}
      <ambientLight intensity={0.7} color="#fff8ed" />
      <directionalLight
        position={[2.5, 3.5, 2.5]}
        intensity={1.4}
        color="#fff6eb"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-2.5, 1.5, 1.5]}
        intensity={0.5}
        color="#e8eff8"
      />
      {/* Rim light for crisp silhouette separation */}
      <directionalLight
        position={[0, 3, -2.5]}
        intensity={1.0}
        color="#ffedd8"
      />

      <Suspense fallback={null}>
        {children}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.4}
          scale={2.5}
          blur={2.2}
          far={1.5}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.07}
        minDistance={1.2}
        maxDistance={3.5}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 1.75}
        target={[0, 0.9, 0]}
      />
    </>
  );
}

export function OutfitViewer3D({
  className,
  isPlaying = true,
  onTogglePlay,
  children,
}: OutfitViewer3DProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [internalPlaying, setInternalPlaying] = useState(isPlaying);

  const playing = onTogglePlay ? isPlaying : internalPlaying;
  const togglePlay = onTogglePlay ?? (() => setInternalPlaying((p) => !p));

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0.9, 0);
    }
  };

  return (
    <ClientOnly fallback={<ViewerSkeleton className={className} />}>
      {() => (
        <div
          className={cn(
            "relative h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-paper-deep/60 to-paper/20 select-none",
            className,
          )}
        >
          {/* WebGL Canvas */}
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1.05, 2.3], fov: 38 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            className="h-full w-full cursor-grab active:cursor-grabbing"
          >
            <SceneStudio controlsRef={controlsRef}>{children}</SceneStudio>
          </Canvas>

          {/* Quick interactive controls overlay */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-hairline/80 bg-card/85 p-1 shadow-xs backdrop-blur-md">
              <button
                type="button"
                onClick={handleResetCamera}
                title="Reset view"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-paper-deep/60 hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                <span className="sr-only">Reset camera</span>
              </button>
              <button
                type="button"
                onClick={togglePlay}
                title={playing ? "Pause animation" : "Play animation"}
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-paper-deep/60 hover:text-foreground"
              >
                {playing ? (
                  <Pause className="size-3.5" aria-hidden />
                ) : (
                  <Play className="size-3.5" aria-hidden />
                )}
                <span className="sr-only">
                  {playing ? "Pause animation" : "Play animation"}
                </span>
              </button>
            </div>

            <p className="label-caps rounded-full border border-hairline/60 bg-card/75 px-3 py-1 text-[10px] text-muted-foreground/80 backdrop-blur-xs">
              Drag to rotate
            </p>
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
