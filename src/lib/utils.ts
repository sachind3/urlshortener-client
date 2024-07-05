import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getClientUrl() {
  return import.meta.env.VITE_ENVIRONMENT_MODE === "development"
    ? "http://localhost:5173"
    : "http://localhost:5173";
}
