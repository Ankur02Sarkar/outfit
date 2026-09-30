import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import type { Group, MeshStandardMaterial, SkinnedMesh } from "three";

import type { FabricId, FigureConfig } from "~/lib/types";

export interface StandingManAvatarProps extends React.ComponentProps<"group"> {
  config: FigureConfig;
  isPlaying?: boolean;
}

function getFabricPBR(fabric: FabricId | undefined, defaultRoughness = 0.82) {
  switch (fabric) {
    case "linen":
      return { roughness: 0.92, metalness: 0.0 };
    case "cotton":
      return { roughness: 0.82, metalness: 0.0 };
    case "wool":
      return { roughness: 0.72, metalness: 0.04 };
    case "silk":
      return { roughness: 0.36, metalness: 0.12 };
    case "leather":
      return { roughness: 0.38, metalness: 0.18 };
    case "suede":
      return { roughness: 0.86, metalness: 0.0 };
    default:
      return { roughness: defaultRoughness, metalness: 0.0 };
  }
}

/**
 * Procedural Quiet-Luxury Sunglasses
 */
function SunglassesOverlay() {
  return (
    <group position={[0, 1.48, 0.11]} scale={0.07}>
      {/* Left Lens & Rim */}
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.62, 0.36, 0.05]} />
        <meshStandardMaterial color="#1a1816" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Right Lens & Rim */}
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.62, 0.36, 0.05]} />
        <meshStandardMaterial color="#1a1816" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.26, 0.04, 0.04]} />
        <meshStandardMaterial color="#a67c4a" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Quiet-Luxury Timepiece on Left Wrist
 */
function WatchOverlay({ type }: { type: "steel" | "vintage" }) {
  const isSteel = type === "steel";
  return (
    <group position={[0.48, 0.83, 0.02]} rotation={[0, 0, Math.PI / 4]} scale={0.038}>
      {/* Strap */}
      <mesh>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
        <meshStandardMaterial
          color={isSteel ? "#c2c7cd" : "#4a342a"}
          roughness={isSteel ? 0.3 : 0.75}
          metalness={isSteel ? 0.9 : 0.1}
        />
      </mesh>
      {/* Dial Case */}
      <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 24]} />
        <meshStandardMaterial
          color={isSteel ? "#d6dadf" : "#a67c4a"}
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>
      {/* Dial Face */}
      <mesh position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial
          color={isSteel ? "#1e2942" : "#f1e8d6"}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

export function StandingManAvatar({
  config,
  isPlaying = true,
  ...props
}: StandingManAvatarProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/standing_man.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as unknown as {
    nodes: Record<string, SkinnedMesh & { skeleton?: THREE.Skeleton }>;
    materials: Record<string, MeshStandardMaterial>;
  };
  const { actions } = useAnimations(animations, group);

  // Dedicated cloned materials to allow pure dynamic color & roughness updates
  const matTop = useMemo(() => materials.Mat_Top.clone(), [materials.Mat_Top]);
  const matBottom = useMemo(() => materials.Mat_Bottom.clone(), [materials.Mat_Bottom]);
  const matShoes = useMemo(() => materials.Mat_Shoes.clone(), [materials.Mat_Shoes]);
  const matBody = useMemo(() => materials.Mat_Skin_Body.clone(), [materials.Mat_Skin_Body]);
  const matHead = useMemo(() => materials.Mat_Skin_Head.clone(), [materials.Mat_Skin_Head]);

  // Determine top color: if layer is active, layer color is worn on the outer silhouette
  const topColorHex = config.layer ? config.layer.color : (config.top?.color ?? "#f1e8d6");
  const topFabric = config.layer ? config.layer.fabric : config.top?.fabric;

  // Reactively apply outfit styling
  useEffect(() => {
    // Top
    matTop.color.set(topColorHex);
    const topPbr = getFabricPBR(topFabric, 0.82);
    matTop.roughness = topPbr.roughness;
    matTop.metalness = topPbr.metalness;
    matTop.needsUpdate = true;

    // Bottom
    matBottom.color.set(config.bottom.color);
    const botPbr = getFabricPBR(config.bottom.fabric, 0.88);
    matBottom.roughness = botPbr.roughness;
    matBottom.metalness = botPbr.metalness;
    matBottom.needsUpdate = true;

    // Shoes
    matShoes.color.set(config.footwear.color);
    const shoePbr = getFabricPBR(config.footwear.fabric, 0.42);
    matShoes.roughness = shoePbr.roughness;
    matShoes.metalness = shoePbr.metalness;
    matShoes.needsUpdate = true;

    // Skin (warm medium-brown #b07a55)
    matBody.color.set("#ffffff"); // Texture already calibrated to #b07a55
    matHead.color.set("#ffffff");
    matBody.roughness = 0.65;
    matHead.roughness = 0.65;
    matBody.needsUpdate = true;
    matHead.needsUpdate = true;
  }, [topColorHex, topFabric, config.bottom, config.footwear, matTop, matBottom, matShoes, matBody, matHead]);

  // Handle breathing idle animation
  useEffect(() => {
    const idleAction = actions["mixamo.com"];
    if (!idleAction) return;

    if (isPlaying) {
      idleAction.reset().fadeIn(0.4).play();
      idleAction.setEffectiveTimeScale(0.72); // Gentle, calm quiet-luxury breathing stance
    } else {
      idleAction.paused = true;
    }

    return () => {
      idleAction.fadeOut(0.3);
    };
  }, [actions, isPlaying]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* Model centered with scale matching canvas portrait ratio */}
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.943}>
          <group name="standing_manfbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  
                  {/* Facial Details */}
                  {nodes.Object_16 && (
                    <skinnedMesh
                      name="Object_16"
                      geometry={nodes.Object_16.geometry}
                      material={materials.LeftCornea_map}
                      skeleton={nodes.Object_16.skeleton}
                    />
                  )}
                  {nodes.Object_17 && (
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={materials.RightCornea_map}
                      skeleton={nodes.Object_17.skeleton}
                    />
                  )}
                  {nodes.Object_18 && (
                    <skinnedMesh
                      name="Object_18"
                      geometry={nodes.Object_18.geometry}
                      material={materials.TeethLower_map}
                      skeleton={nodes.Object_18.skeleton}
                    />
                  )}
                  {nodes.Object_19 && (
                    <skinnedMesh
                      name="Object_19"
                      geometry={nodes.Object_19.geometry}
                      material={materials.TeethLower_map}
                      skeleton={nodes.Object_19.skeleton}
                    />
                  )}
                  {nodes.Object_20 && (
                    <skinnedMesh
                      name="Object_20"
                      geometry={nodes.Object_20.geometry}
                      material={materials.Eyelashes_map}
                      skeleton={nodes.Object_20.skeleton}
                    />
                  )}

                  {/* Body & Head (Warm Medium-Brown Skin #b07a55) */}
                  {nodes.StandingMan_Body && (
                    <skinnedMesh
                      name="StandingMan_Body"
                      geometry={nodes.StandingMan_Body.geometry}
                      material={matBody}
                      skeleton={nodes.StandingMan_Body.skeleton}
                      castShadow
                      receiveShadow
                    />
                  )}
                  {nodes.StandingMan_Head && (
                    <skinnedMesh
                      name="StandingMan_Head"
                      geometry={nodes.StandingMan_Head.geometry}
                      material={matHead}
                      skeleton={nodes.StandingMan_Head.skeleton}
                      castShadow
                    />
                  )}

                  {/* Dynamic Garments */}
                  {nodes.StandingMan_Top && (
                    <skinnedMesh
                      name="StandingMan_Top"
                      geometry={nodes.StandingMan_Top.geometry}
                      material={matTop}
                      skeleton={nodes.StandingMan_Top.skeleton}
                      castShadow
                      receiveShadow
                    />
                  )}
                  {nodes.StandingMan_Bottom && (
                    <skinnedMesh
                      name="StandingMan_Bottom"
                      geometry={nodes.StandingMan_Bottom.geometry}
                      material={matBottom}
                      skeleton={nodes.StandingMan_Bottom.skeleton}
                      castShadow
                      receiveShadow
                    />
                  )}
                  {nodes.StandingMan_Shoe_L && (
                    <skinnedMesh
                      name="StandingMan_Shoe_L"
                      geometry={nodes.StandingMan_Shoe_L.geometry}
                      material={matShoes}
                      skeleton={nodes.StandingMan_Shoe_L.skeleton}
                      castShadow
                    />
                  )}
                  {nodes.StandingMan_Shoe_R && (
                    <skinnedMesh
                      name="StandingMan_Shoe_R"
                      geometry={nodes.StandingMan_Shoe_R.geometry}
                      material={matShoes}
                      skeleton={nodes.StandingMan_Shoe_R.skeleton}
                      castShadow
                    />
                  )}
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* Dynamic Accessories */}
        {config.sunglasses && <SunglassesOverlay />}
        {config.watch && config.watch !== "none" && <WatchOverlay type={config.watch} />}
      </group>
    </group>
  );
}

useGLTF.preload("/models/standing_man.glb");
