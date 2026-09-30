import { color, nameOf } from "~/data/colors";
import { cn } from "~/lib/utils";

export interface SwatchProps {
  colorId: string;
  size?: "sm" | "md" | "lg";
  withName?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<SwatchProps["size"]>, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-6",
};

export function Swatch({ colorId, size = "md", withName, className }: SwatchProps) {
  const token = color(colorId);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className={cn(
          "shrink-0 rounded-full ring-1 ring-foreground/15",
          SIZE_CLASSES[size],
        )}
        style={{ backgroundColor: token.hex }}
      />
      {withName ? (
        <span className="text-xs text-muted-foreground">{nameOf(colorId)}</span>
      ) : null}
    </span>
  );
}

export interface SwatchRowProps {
  colorIds: readonly string[];
  size?: SwatchProps["size"];
  className?: string;
}

export function SwatchRow({ colorIds, size = "sm", className }: SwatchRowProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {colorIds.map((id) => (
        <Swatch key={id} colorId={id} size={size} />
      ))}
    </span>
  );
}
