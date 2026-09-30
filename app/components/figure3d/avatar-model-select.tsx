import * as React from "react";
import { User } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { AVATAR_MODELS } from "./model-registry";
import { cn } from "~/lib/utils";

export interface AvatarModelSelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function AvatarModelSelect({
  selectedId,
  onSelect,
  className,
}: AvatarModelSelectProps) {
  const selectedModel =
    AVATAR_MODELS.find((m) => m.id === selectedId) ?? AVATAR_MODELS[0];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger
          size="sm"
          className="h-7.5 gap-2 rounded-full border-hairline bg-card/90 px-3 text-xs font-medium tracking-tight text-foreground shadow-2xs hover:border-brass/40"
        >
          <span className="flex items-center gap-1.5">
            <User className="size-3 text-brass" aria-hidden />
            <span className="font-medium">{selectedModel?.name}</span>
            <span className="hidden text-[10px] text-muted-foreground md:inline">
              ({selectedModel?.subtitle})
            </span>
          </span>
        </SelectTrigger>
        <SelectContent
          align="end"
          className="w-56 rounded-2xl border-hairline bg-card/95 p-1 backdrop-blur-md"
        >
          {AVATAR_MODELS.map((model) => (
            <SelectItem
              key={model.id}
              value={model.id}
              disabled={!model.available}
              className="rounded-xl px-2.5 py-1.5 text-xs focus:bg-paper-deep/60"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{model.name}</span>
                  {!model.available && (
                    <span className="rounded-full bg-paper-deep/80 px-1.5 py-0.5 text-[9px] tracking-wide text-muted-foreground uppercase">
                      Soon
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {model.subtitle}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
