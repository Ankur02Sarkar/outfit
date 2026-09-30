export interface AvatarModelOption {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  modelPath: string;
  available: boolean;
}

export const AVATAR_MODELS: readonly AvatarModelOption[] = [
  {
    id: "standing_man",
    name: "Standing Man",
    subtitle: "Lean Build · 63 kg",
    description:
      "Calibrated athletic silhouette for warm medium-brown skin with a natural idle breathing stance.",
    modelPath: "/models/standing_man.glb",
    available: true,
  },
  {
    id: "indian_teenager",
    name: "Indian Teenager",
    subtitle: "Youthful Build",
    description: "Slender contemporary silhouette (Coming in a future update).",
    modelPath: "/models/indian_teenager.glb",
    available: false,
  },
  {
    id: "cool_man",
    name: "Cool Man",
    subtitle: "Relaxed Casual",
    description: "Relaxed urban proportions (Coming in a future update).",
    modelPath: "/models/cool_man.glb",
    available: false,
  },
  {
    id: "indian_man",
    name: "Indian Man",
    subtitle: "Classic Build",
    description: "Traditional tailored frame (Coming in a future update).",
    modelPath: "/models/indian_man.glb",
    available: false,
  },
] as const;

export const DEFAULT_AVATAR_MODEL_ID = "standing_man";
