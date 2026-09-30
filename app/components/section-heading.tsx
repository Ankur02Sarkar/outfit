import { cn } from "~/lib/utils";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      <p className="label-caps text-brass">{eyebrow}</p>
      <h2 className="text-3xl font-light tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto max-w-6xl space-y-5 px-5 py-14 md:px-8 md:py-20">
        <p className="label-caps text-brass">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-4xl font-light tracking-tight text-balance md:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
        {children}
      </div>
    </header>
  );
}
