// Joins class names, dropping falsy ones, and lets a later Tailwind class win
// over an earlier one it conflicts with. It knows Tailwind's own scale names
// (text-xl, rounded-2xl, ...), which is why the theme sticks to them.
export { cn } from "cnfast";
