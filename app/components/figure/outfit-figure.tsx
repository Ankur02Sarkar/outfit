import { useId } from "react";

import { SKIN } from "~/data/colors";
import { foldStroke, isLight, outlineOn } from "~/lib/color";
import type { FigureConfig } from "~/lib/types";

// ————————————————————————— Geometry —————————————————————————
// Figure sits in a 260 × 560 viewBox. Head top ≈ 32, shoe sole ≈ 530.

const SKIN_STROKE = "rgba(74, 44, 24, 0.28)";

const HEAD =
  "M130 32 C116 32 106 44 106 60 C106 72 112 82 120 86 C124 88 127 89 130 89 C133 89 136 88 140 86 C148 82 154 72 154 60 C154 44 144 32 130 32 Z";
const HAIR =
  "M104 62 C104 40 114 26 130 26 C146 26 156 40 156 62 C154 52 149 46 144 43 C139 40 134 39 130 39 C124 39 117 41 112 46 C108 50 105 56 104 62 Z";
const EAR = "M106 60 C103 58 101 60 101 63 C101 66 103 69 106 68 Z";
const EAR_R = "M154 60 C157 58 159 60 159 63 C159 66 157 69 154 68 Z";
const NECK = "M121 78 H139 V100 C139 107 132 110 130 110 C128 110 121 107 121 100 Z";
const NECK_SHADOW = "M121 86 C125 94 135 94 139 86 V92 C135 99 125 99 121 92 Z";

const ARM_L =
  "M95 118 C87 124 82 140 79 160 C76 182 73 210 71 238 C70 254 69 266 68 276 C67 282 67 288 68 292 C69 296 73 298 76 296 C80 293 82 288 83 280 C85 262 87 240 90 218 C93 194 97 170 100 150 C102 136 102 124 99 118 Z";
const ARM_R =
  "M165 118 C173 124 178 140 181 160 C184 182 187 210 189 238 C190 254 191 266 192 276 C193 282 193 288 192 292 C191 296 187 298 184 296 C180 293 178 288 177 280 C175 262 173 240 170 218 C167 194 163 170 160 150 C158 136 158 124 161 118 Z";

const LEG_L =
  "M102 246 C99 300 99 352 101 402 C102 442 103 476 104 504 L104 512 H125 L125 504 C124 476 123 442 124 402 C126 352 126 300 125 246 Z";
const LEG_R =
  "M158 246 C161 300 161 352 159 402 C158 442 157 476 156 504 L156 512 H135 L135 504 C136 476 137 442 136 402 C134 352 134 300 135 246 Z";

// ————————————————————————— Bottoms —————————————————————————

const PANTS_STRAIGHT =
  "M97 232 H163 C163 300 162 386 160 470 C160 486 159 498 159 506 H135 C135 480 134 430 132 386 L130 370 L128 386 C126 430 125 480 125 506 H101 C101 498 100 486 100 470 C98 386 97 300 97 232 Z";
const PANTS_SHORTS =
  "M98 232 H162 C162 268 161 330 160 364 C160 372 159 376 159 380 H135 C135 372 135 366 134 360 L130 344 L126 360 C125 366 125 372 125 380 H101 C101 376 100 372 100 364 C99 330 98 268 98 232 Z";
const PANTS_WIDE =
  "M97 232 H163 C164 300 165 388 165 470 C165 488 164 500 163 508 H131 C131 480 130 428 130 386 L130 372 L126 386 C126 428 125 480 125 508 H93 C92 500 91 488 91 470 C91 388 96 300 97 232 Z";

const BOTTOM_FOLDS: Record<string, readonly string[]> = {
  straight: [
    "M107 244 C106 320 107 400 109 494",
    "M153 244 C154 320 153 400 151 494",
    "M112 250 C111 320 112 400 113 490",
    "M148 250 C149 320 148 400 147 490",
  ],
  shorts: [
    "M108 240 C107 280 108 320 109 372",
    "M152 240 C153 280 152 320 151 372",
  ],
};

// Cargo pocket, pleat and stitch detail overlays (semi-transparent).
const CARGO_POCKET_L = "M104 268 h18 v26 h-18 z";
const CARGO_FLAP_L = "M104 268 h18 v7 h-18 z";
const CARGO_POCKET_R = "M138 268 h18 v26 h-18 z";
const CARGO_FLAP_R = "M138 268 h18 v7 h-18 z";
const PLEAT_L = "M112 236 V480";
const PLEAT_R = "M148 236 V480";
const PLEAT_C = "M130 240 V360";

// ————————————————————————— Tops —————————————————————————

const TORSO_TEE =
  "M113 108 C108 109 97 113 93 119 C89 125 88 139 90 153 C92 174 97 202 99 230 C99 240 100 246 101 250 H159 C160 246 161 240 161 230 C163 202 168 174 170 153 C172 139 171 125 167 119 C163 113 152 109 147 108 C141 117 136 122 130 122 C124 122 119 117 113 108 Z";
const SLEEVE_SHORT_L =
  "M94 117 C86 124 82 138 80 154 L98 160 C100 144 101 132 105 122 Z";
const SLEEVE_SHORT_R =
  "M166 117 C174 124 178 138 180 154 L162 160 C160 144 159 132 155 122 Z";

const SLEEVE_LONG_L =
  "M94 117 C84 126 79 142 76 162 C73 184 70 210 68 236 C67 250 67 260 67 268 L84 270 C85 260 86 248 88 234 C91 210 94 184 98 160 C101 142 103 128 106 121 Z";
const SLEEVE_LONG_R =
  "M166 117 C176 126 181 142 184 162 C187 184 190 210 192 236 C193 250 193 260 193 268 L176 270 C175 260 174 248 172 234 C169 210 166 184 162 160 C159 142 157 128 154 121 Z";

const SHIRT_BODY =
  "M113 108 C108 109 97 113 93 119 C89 125 88 139 90 153 C92 174 97 202 99 230 C99 244 100 252 101 258 H159 C160 252 161 244 161 230 C163 202 168 174 170 153 C172 139 171 125 167 119 C163 113 152 109 147 108 C141 116 136 121 130 121 C124 121 119 116 113 108 Z";
const KURTA_BODY =
  "M112 107 C106 108 96 113 92 119 C88 126 87 142 89 158 C91 180 94 214 95 248 C96 282 95 310 94 332 C94 338 95 342 96 344 H164 C165 342 166 338 166 332 C165 310 164 282 165 248 C166 214 169 180 171 158 C173 142 172 126 168 119 C164 113 154 108 148 107 C142 116 136 121 130 121 C124 121 118 116 112 107 Z";

const COLLAR_MANDARIN =
  "M117 104 C121 111 126 115 130 115 C134 115 139 111 143 104 L146 110 C141 119 135 123 130 123 C125 123 119 119 114 110 Z";
const PLACKET = "M130 122 V250";
const KURTA_PLACKET = "M130 121 V340";

const POLO_COLLAR =
  "M116 105 C121 112 126 116 130 116 C134 116 139 112 144 105 L149 111 L140 121 L134 113 L126 113 L120 121 L111 111 Z";
const POLO_V = "M130 116 L126 130 M130 116 L134 130";

const TOP_FOLDS: Record<string, readonly string[]> = {
  tee: [
    "M96 150 C98 180 100 210 101 244",
    "M164 150 C162 180 160 210 159 244",
  ],
  shirt: [
    "M96 150 C98 180 100 220 101 254",
    "M164 150 C162 180 160 220 159 254",
    "M84 200 C86 226 87 248 88 262",
    "M176 200 C174 226 173 248 172 262",
  ],
  kurta: [
    "M99 170 C101 210 102 250 102 300",
    "M161 170 C159 210 158 250 158 300",
    "M112 180 C114 230 114 290 114 336",
    "M148 180 C146 230 146 290 146 336",
    "M104 330 C116 338 144 338 156 330",
  ],
};

// ————————————————————————— Layers —————————————————————————

const OVERSHIRT_L =
  "M96 113 C102 109 109 106 115 105 C119 109 123 113 126 118 C124 136 120 160 116 188 C112 216 107 250 105 296 C99 299 93 300 88 297 C89 272 91 236 92 196 C93 160 94 132 96 113 Z";
const OVERSHIRT_R =
  "M164 113 C158 109 151 106 145 105 C141 109 137 113 134 118 C136 136 140 160 144 188 C148 216 153 250 155 296 C161 299 167 300 172 297 C171 272 169 236 168 196 C167 160 166 132 164 113 Z";
const CHORE_L =
  "M96 113 C102 109 109 106 115 105 C119 109 123 113 126 118 C124 136 121 154 117 176 C114 198 111 230 109 270 C103 273 96 274 90 271 C91 248 92 214 93 180 C94 152 95 132 96 113 Z";
const CHORE_R =
  "M164 113 C158 109 151 106 145 105 C141 109 137 113 134 118 C136 136 139 154 143 176 C146 198 149 230 151 270 C157 273 164 274 170 271 C169 248 168 214 167 180 C166 152 165 132 164 113 Z";

const LAYER_COLLAR_L = "M113 103 L127 109 L121 119 L109 109 Z";
const LAYER_COLLAR_R = "M147 103 L133 109 L139 119 L151 109 Z";

const BANDI_L =
  "M95 114 C101 110 108 107 114 106 C118 111 122 116 124 121 C121 142 119 168 118 196 C117 218 117 234 118 248 C112 251 105 252 99 250 C97 218 96 178 95 140 Z";
const BANDI_R =
  "M165 114 C159 110 152 107 146 106 C142 111 138 116 136 121 C139 142 141 168 142 196 C143 218 143 234 142 248 C148 251 155 252 161 250 C163 218 164 178 165 140 Z";

const STOLE =
  "M163 110 C154 120 143 132 132 148 C121 163 114 182 110 202 C107 216 105 228 104 238 L122 246 C124 232 127 216 132 202 C139 184 148 170 160 158 C168 150 174 142 177 136 L172 114 Z";

const CHORE_POCKET_L = "M101 148 h13 v15 h-13 z";
const CHORE_POCKET_FLAP_L = "M101 148 h13 v5 h-13 z";
const CHORE_POCKET_R = "M146 148 h13 v15 h-13 z";
const CHORE_POCKET_FLAP_R = "M146 148 h13 v5 h-13 z";

const LAYER_FOLDS: Record<string, readonly string[]> = {
  overshirt: [
    "M98 140 C96 190 94 240 92 288",
    "M162 140 C164 190 166 240 168 288",
    "M118 140 C115 190 111 240 108 292",
    "M142 140 C145 190 149 240 152 292",
    "M80 200 C79 230 78 252 78 266",
    "M180 200 C181 230 182 252 182 266",
  ],
  chore: [
    "M98 140 C97 176 96 220 94 262",
    "M162 140 C163 176 164 220 166 262",
    "M120 140 C117 176 114 220 112 264",
    "M140 140 C143 176 146 220 148 264",
  ],
  bandi: [
    "M104 140 C103 180 103 216 104 246",
    "M156 140 C157 180 157 216 156 246",
  ],
  stole: [
    "M158 124 C148 138 138 152 128 168 C118 184 112 202 108 220",
    "M166 130 C156 142 146 156 138 172 C130 188 125 204 122 222",
  ],
};

// ————————————————————————— Footwear —————————————————————————

const SHOE_FOLDS: Record<string, readonly string[]> = {
  sneaker: ["M101 514 C108 516 118 516 125 514", "M101 521 C108 523 118 523 125 521"],
  loafer: ["M102 512 C110 514 118 514 124 512"],
  derby: ["M101 514 C108 516 118 516 125 514"],
  boot: ["M105 478 C112 480 118 480 123 478", "M104 512 C110 514 118 514 124 512"],
  sandal: ["M103 518 C110 520 120 520 126 518"],
  kolhapuri: ["M103 514 C110 516 120 516 126 514", "M103 520 C110 522 120 522 126 520"],
};

// ————————————————————————— Rendering —————————————————————————

interface PieceProps {
  d: string;
  color: string;
  fabric: FigureConfig["footwear"]["fabric"];
  uid: string;
  folds?: readonly string[];
  children?: React.ReactNode;
}

function patternId(fabric: PieceProps["fabric"]): string {
  switch (fabric) {
    case "linen":
      return "linen";
    case "denim":
      return "denim";
    case "twill":
      return "twill";
    case "khadi":
      return "khadi";
    case "suede":
      return "suede";
    case "wool":
      return "wool";
    case "cotton":
      return "cotton";
    case "silk":
    case "leather":
      return "none";
  }
}

function Piece({ d, color, fabric, uid, folds = [], children }: PieceProps) {
  const pattern = patternId(fabric);
  const sheen = fabric === "silk" || fabric === "leather";
  return (
    <g>
      <path
        d={d}
        fill={color}
        stroke={outlineOn(color)}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      {pattern !== "none" ? (
        <path d={d} fill={`url(#${uid}-${pattern})`} />
      ) : null}
      {sheen ? <path d={d} fill={`url(#${uid}-sheen)`} /> : null}
      {folds.map((fold) => (
        <path
          key={fold}
          d={fold}
          fill="none"
          stroke={foldStroke(color)}
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      ))}
      {children}
    </g>
  );
}

function defs(uid: string) {
  return (
    <defs>
      <pattern
        id={`${uid}-linen`}
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 0 H5 M0 0 V5"
          stroke="rgba(60, 48, 32, 0.07)"
          strokeWidth="0.6"
        />
      </pattern>
      <pattern
        id={`${uid}-denim`}
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <path d="M0 0 V5" stroke="rgba(0, 0, 0, 0.09)" strokeWidth="0.7" />
        <path d="M2.5 0 V5" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.7" />
      </pattern>
      <pattern
        id={`${uid}-twill`}
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(40)"
      >
        <path d="M0 0 V6" stroke="rgba(0, 0, 0, 0.055)" strokeWidth="0.8" />
      </pattern>
      <pattern id={`${uid}-khadi`} width="9" height="9" patternUnits="userSpaceOnUse">
        <path
          d="M1 1 h3 M6 4 h2 M2 7 h3"
          stroke="rgba(50, 40, 26, 0.10)"
          strokeWidth="0.7"
        />
      </pattern>
      <pattern id={`${uid}-suede`} width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="rgba(0, 0, 0, 0.05)" />
        <circle cx="3" cy="3" r="0.5" fill="rgba(255, 255, 255, 0.05)" />
      </pattern>
      <pattern id={`${uid}-wool`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 0 L3 3 L6 0" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="0.7" />
      </pattern>
      <pattern id={`${uid}-cotton`} width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.4" fill="rgba(0, 0, 0, 0.04)" />
        <circle cx="4" cy="4" r="0.4" fill="rgba(0, 0, 0, 0.04)" />
      </pattern>
      <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
        <stop offset="38%" stopColor="rgba(255, 255, 255, 0)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.12)" />
      </linearGradient>
      <radialGradient id={`${uid}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="rgba(64, 46, 28, 0.22)" />
        <stop offset="100%" stopColor="rgba(64, 46, 28, 0)" />
      </radialGradient>
    </defs>
  );
}

function BottomPiece({ config, uid }: { config: FigureConfig; uid: string }) {
  const { style, color, fabric } = config.bottom;
  const d =
    style === "shorts"
      ? PANTS_SHORTS
      : style === "pajama"
        ? PANTS_WIDE
        : PANTS_STRAIGHT;
  const folds =
    style === "shorts" ? BOTTOM_FOLDS.shorts : BOTTOM_FOLDS.straight;

  return (
    <Piece d={d} color={color} fabric={fabric} uid={uid} folds={folds}>
      {style === "cargo" ? (
        <g opacity="0.55">
          <path d={CARGO_POCKET_L} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          <path d={CARGO_FLAP_L} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          <path d={CARGO_POCKET_R} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          <path d={CARGO_FLAP_R} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
        </g>
      ) : null}
      {style === "pleated" ? (
        <g opacity="0.8">
          {[PLEAT_L, PLEAT_C, PLEAT_R].map((pleat) => (
            <path key={pleat} d={pleat} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          ))}
        </g>
      ) : null}
      {style === "jeans" ? (
        <g opacity="0.75">
          <path d="M100 240 C104 262 108 282 110 300" fill="none" stroke={foldStroke(color)} strokeWidth="1" />
          <path d="M160 240 C156 262 152 282 150 300" fill="none" stroke={foldStroke(color)} strokeWidth="1" />
          <path d="M105 500 H124" stroke={foldStroke(color)} strokeWidth="1" />
          <path d="M136 500 H155" stroke={foldStroke(color)} strokeWidth="1" />
        </g>
      ) : null}
      {style === "churidar" ? (
        <g opacity="0.8">
          <path d="M106 480 C112 486 120 486 123 480" fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          <path d="M137 480 C142 486 150 486 153 480" fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
        </g>
      ) : null}
      {style === "gurkha" ? (
        <g opacity="0.7">
          <path d="M99 244 C114 250 146 250 161 244" fill="none" stroke={foldStroke(color)} strokeWidth="1.2" />
          <path d="M99 252 C114 258 146 258 161 252" fill="none" stroke={foldStroke(color)} strokeWidth="1" />
        </g>
      ) : null}
    </Piece>
  );
}

function TopPiece({ config, uid }: { config: FigureConfig; uid: string }) {
  const top = config.top;
  if (!top) return null;
  const { style, color, fabric } = top;

  if (style === "kurta") {
    return (
      <Piece d={KURTA_BODY} color={color} fabric={fabric} uid={uid} folds={TOP_FOLDS.kurta}>
        <path d={COLLAR_MANDARIN} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        <path d={KURTA_PLACKET} fill="none" stroke={foldStroke(color)} strokeWidth="1" />
        <path d={SLEEVE_LONG_L} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        <path d={SLEEVE_LONG_R} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
      </Piece>
    );
  }

  if (style === "grandad") {
    return (
      <Piece d={SHIRT_BODY} color={color} fabric={fabric} uid={uid} folds={TOP_FOLDS.shirt}>
        <path d={COLLAR_MANDARIN} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        <path d={PLACKET} fill="none" stroke={foldStroke(color)} strokeWidth="1" />
        <path d={SLEEVE_LONG_L} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        <path d={SLEEVE_LONG_R} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
      </Piece>
    );
  }

  if (style === "polo") {
    return (
      <Piece d={TORSO_TEE} color={color} fabric={fabric} uid={uid} folds={TOP_FOLDS.tee}>
        <path d={SLEEVE_SHORT_L} fill={color} stroke={outlineOn(color)} strokeWidth="1.1" />
        <path d={SLEEVE_SHORT_R} fill={color} stroke={outlineOn(color)} strokeWidth="1.1" />
        <path d={POLO_COLLAR} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        <path d={POLO_V} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
        <circle cx="130" cy="133" r="1.4" fill={foldStroke(color)} />
        <circle cx="130" cy="142" r="1.4" fill={foldStroke(color)} />
      </Piece>
    );
  }

  return (
    <Piece d={TORSO_TEE} color={color} fabric={fabric} uid={uid} folds={TOP_FOLDS.tee}>
      <path d={SLEEVE_SHORT_L} fill={color} stroke={outlineOn(color)} strokeWidth="1.1" />
      <path d={SLEEVE_SHORT_R} fill={color} stroke={outlineOn(color)} strokeWidth="1.1" />
    </Piece>
  );
}

function LayerPiece({ config, uid }: { config: FigureConfig; uid: string }) {
  const layer = config.layer;
  if (!layer) return null;
  const { style, color, fabric } = layer;

  if (style === "bandi") {
    return (
      <Piece d={BANDI_L} color={color} fabric={fabric} uid={uid} folds={LAYER_FOLDS.bandi}>
        <path d={BANDI_R} fill={color} stroke={outlineOn(color)} strokeWidth="1.1" />
        <path d={COLLAR_MANDARIN} fill={color} stroke={outlineOn(color)} strokeWidth="1" />
        {[148, 166, 184, 202, 220].map((y) => (
          <circle key={y} cx="130" cy={y} r="1.5" fill={foldStroke(color)} />
        ))}
        {config.pocketSquare ? (
          <path
            d="M138 140 L146 138 L142 152 Z"
            fill={config.pocketSquare}
            stroke={outlineOn(config.pocketSquare)}
            strokeWidth="0.8"
          />
        ) : null}
      </Piece>
    );
  }

  if (style === "stole") {
    return (
      <Piece d={STOLE} color={color} fabric={fabric} uid={uid} folds={LAYER_FOLDS.stole} />
    );
  }

  const isChore = style === "chore";
  return (
    <g>
      <Piece d={SLEEVE_LONG_L} color={color} fabric={fabric} uid={uid} />
      <Piece d={SLEEVE_LONG_R} color={color} fabric={fabric} uid={uid} />
      <Piece
        d={isChore ? CHORE_L : OVERSHIRT_L}
        color={color}
        fabric={fabric}
        uid={uid}
        folds={isChore ? LAYER_FOLDS.chore : LAYER_FOLDS.overshirt}
      >
        <path
          d={isChore ? CHORE_R : OVERSHIRT_R}
          fill={color}
          stroke={outlineOn(color)}
          strokeWidth="1.1"
        />
        <path d={LAYER_COLLAR_L} fill={color} stroke={outlineOn(color)} strokeWidth="0.9" />
        <path d={LAYER_COLLAR_R} fill={color} stroke={outlineOn(color)} strokeWidth="0.9" />
        {isChore ? (
          <g opacity="0.6">
            <path d={CHORE_POCKET_L} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
            <path d={CHORE_POCKET_FLAP_L} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
            <path d={CHORE_POCKET_R} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
            <path d={CHORE_POCKET_FLAP_R} fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
          </g>
        ) : null}
        {config.pocketSquare && !isChore ? (
          <path
            d="M101 142 L109 140 L105 154 Z"
            fill={config.pocketSquare}
            stroke={outlineOn(config.pocketSquare)}
            strokeWidth="0.8"
          />
        ) : null}
      </Piece>
    </g>
  );
}

function FootwearPiece({ config, uid }: { config: FigureConfig; uid: string }) {
  const { style, color, fabric } = config.footwear;

  const parts: Record<string, { d: string; extra?: React.ReactNode }> = {
    sneaker: {
      d: "M100 502 H126 C128 506 128 512 127 518 C126 524 122 528 116 528 H106 C100 528 97 524 97 518 C96 512 97 506 100 502 Z",
      extra: (
        <path
          d="M97 519 C106 522 118 522 127 519"
          fill="none"
          stroke={foldStroke(color)}
          strokeWidth="1.1"
        />
      ),
    },
    loafer: {
      d: "M101 504 H125 C127 508 127 514 126 519 C125 524 121 527 115 527 H106 C101 527 99 524 98 519 C97 514 98 508 101 504 Z",
      extra: (
        <path
          d="M103 509 H123"
          fill="none"
          stroke={foldStroke(color)}
          strokeWidth="1.1"
        />
      ),
    },
    derby: {
      d: "M99 500 H127 C129 506 129 514 128 520 C127 526 123 529 116 529 H105 C98 529 95 526 94 520 C93 512 95 505 99 500 Z",
      extra: (
        <g>
          <path d="M94 521 C106 525 120 525 129 521" fill="none" stroke={foldStroke(color)} strokeWidth="1.2" />
          <path d="M97 500 H129" stroke={foldStroke(color)} strokeWidth="1" />
        </g>
      ),
    },
    boot: {
      d: "M101 470 H125 C127 478 128 494 128 508 C128 518 125 525 118 525 H105 C99 525 97 518 97 508 C97 492 99 478 101 470 Z",
      extra: (
        <g>
          <path d="M104 480 H122" fill="none" stroke={foldStroke(color)} strokeWidth="1" />
          <path d="M120 486 V512" fill="none" stroke={foldStroke(color)} strokeWidth="1" />
          <path d="M97 514 C106 518 119 518 128 514" fill="none" stroke={foldStroke(color)} strokeWidth="1.1" />
        </g>
      ),
    },
    sandal: {
      d: "M99 508 H127 C128 512 128 518 127 522 C126 527 122 530 116 530 H105 C99 530 96 527 96 522 C95 518 96 512 99 508 Z",
      extra: (
        <g>
          <path d="M101 510 C106 506 112 506 115 510" fill="none" stroke={foldStroke(color)} strokeWidth="2" />
          <path d="M115 510 C118 506 124 506 127 510" fill="none" stroke={foldStroke(color)} strokeWidth="2" />
        </g>
      ),
    },
    kolhapuri: {
      d: "M98 508 H128 C129 512 129 517 128 521 C127 526 123 529 116 529 H104 C98 529 95 526 94 521 C93 517 94 512 98 508 Z",
      extra: (
        <g>
          <path d="M100 512 H126" stroke={foldStroke(color)} strokeWidth="1.2" />
          <path d="M99 517 H127" stroke={foldStroke(color)} strokeWidth="1.2" />
        </g>
      ),
    },
  };

  const part = parts[style] ?? parts.sneaker;
  if (!part) return null;

  return (
    <Piece d={part.d} color={color} fabric={fabric} uid={uid}>
      {part.extra}
    </Piece>
  );
}

export interface OutfitFigureProps {
  config: FigureConfig;
  className?: string;
  label?: string;
  showShadow?: boolean;
}

export function OutfitFigure({
  config,
  className,
  label,
  showShadow = true,
}: OutfitFigureProps) {
  const uid = useId().replace(/:/g, "");
  const skin = SKIN;

  return (
    <svg
      viewBox="0 0 260 560"
      className={className}
      role="img"
      aria-label={label ?? "Outfit illustration"}
    >
      {defs(uid)}
      {showShadow ? (
        <ellipse cx="130" cy="538" rx="64" ry="14" fill={`url(#${uid}-shadow)`} />
      ) : null}

      {/* Legs & arms — skin */}
      <path d={LEG_L} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1" />
      <path d={LEG_R} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1" />
      <path d={ARM_L} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1" />
      <path d={ARM_R} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1" />

      {/* Bottoms */}
      <BottomPiece config={config} uid={uid} />

      {/* Footwear — mirrored copies */}
      <g>
        <FootwearPiece config={config} uid={uid} />
      </g>
      <g transform="translate(260 0) scale(-1 1)">
        <FootwearPiece config={config} uid={uid} />
      </g>

      {/* Neck & head */}
      <path d={NECK} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1" />
      <path d={NECK_SHADOW} fill={skin.shadowHex} opacity="0.55" />

      {/* Top */}
      <TopPiece config={config} uid={uid} />

      {/* Layer */}
      <LayerPiece config={config} uid={uid} />

      {/* Head */}
      <path d={EAR} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="0.9" />
      <path d={EAR_R} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="0.9" />
      <path d={HEAD} fill={skin.hex} stroke={SKIN_STROKE} strokeWidth="1.1" />
      <path
        d="M112 78 C118 84 126 87 130 87 C136 87 142 83 146 77"
        fill="none"
        stroke={skin.shadowHex}
        strokeWidth="2.4"
        opacity="0.35"
        strokeLinecap="round"
      />
      <path d={HAIR} fill={skin.hairHex} stroke="rgba(20, 14, 8, 0.5)" strokeWidth="0.8" />

      {/* Watch on left wrist */}
      {config.watch !== "none" ? (
        <g>
          <path
            d="M69 258 C73 262 76 265 78 269"
            fill="none"
            stroke={config.watch === "vintage" ? "#4a342a" : "#8f9398"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="73"
            cy="263"
            r="4.4"
            fill={config.watch === "vintage" ? "#b08d57" : "#c6c9cc"}
            stroke="rgba(30, 24, 16, 0.55)"
            strokeWidth="0.9"
          />
        </g>
      ) : null}

      {/* Sunglasses */}
      {config.sunglasses ? (
        <g>
          <rect x="112.5" y="51" width="13" height="11" rx="3.2" fill="rgba(35, 28, 20, 0.88)" stroke="#6e4a2a" strokeWidth="1.6" />
          <rect x="134.5" y="51" width="13" height="11" rx="3.2" fill="rgba(35, 28, 20, 0.88)" stroke="#6e4a2a" strokeWidth="1.6" />
          <path d="M125.5 55.5 H134.5" stroke="#6e4a2a" strokeWidth="1.6" />
          <path d="M112.5 54 L107 57" stroke="#6e4a2a" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M147.5 54 L153 57" stroke="#6e4a2a" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}
