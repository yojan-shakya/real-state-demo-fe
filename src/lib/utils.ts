import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Item = number | "..."
// Note: This is copied from the internet
export function getPagination(current: number, total: number): Item[] {
  const delta = 1
  const range: number[] = []
  const result: Item[] = []

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i)
  }

  if (current - delta > 2) {
    result.push(1, "...")
  } else {
    result.push(1)
  }

  result.push(...range)

  if (current + delta < total - 1) {
    result.push("...", total)
  } else {
    result.push(total)
  }

  return result
}
