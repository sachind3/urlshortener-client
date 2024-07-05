import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getClientUrl() {
  return import.meta.env.VITE_ENVIRONMENT_MODE === "development"
    ? import.meta.env.VITE_CLIENT_DEV
    : import.meta.env.VITE_CLIENT_PROD;
}
export function getServerUrl() {
  return import.meta.env.VITE_ENVIRONMENT_MODE === "development"
    ? import.meta.env.VITE_SERVER_DEV
    : import.meta.env.VITE_SERVER_PROD;
}
