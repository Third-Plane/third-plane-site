import { cn } from "../lib/style";

type Tone = "purple" | "white";

type Props = {
  tone?: Tone;
  className?: string;
};

export function Logo({ tone = "purple", className }: Props) {
  return (
    <img
      className={cn("logo", className)}
      src={`${import.meta.env.BASE_URL}brand/lockup-${tone}.png`}
      alt="Third Plane"
    />
  );
}
