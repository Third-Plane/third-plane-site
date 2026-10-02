import { cn } from "../lib/style";

type Tone = "purple" | "white";

type Props = {
  tone?: Tone;
  className?: string;
  mark?: boolean;
};

export function Logo({ tone = "purple", className, mark = false }: Props) {
  const file = mark ? `mark-${tone}.png` : `lockup-${tone}.png`;
  return (
    <img
      className={cn("logo", className)}
      src={`${import.meta.env.BASE_URL}brand/${file}`}
      alt="Third Plane"
    />
  );
}
