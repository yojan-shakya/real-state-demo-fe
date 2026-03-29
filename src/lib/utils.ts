import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(input: string) {
  return input
    .split("")
    .map((letter, idx) => {
      if (idx === 0) return letter.toUpperCase()
      return letter.toLowerCase()
    })
    .join("")
}
