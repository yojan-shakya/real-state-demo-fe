// Note: This is copied from the internet
export function getPageNumbers(current: number, total: number, delta = 1) {
  let pages = new Set([1, total])
  for (let i = current - delta; i <= current + delta; i++) {
    if (i > 1 && i < total) pages.add(i)
  }

  let result: Array<"..." | number> = []
  let last = 0

  Array.from(pages)
    .sort((a, b) => a - b)
    .forEach((page) => {
      if (page - last > 1) result.push("...")
      result.push(page)
      last = page
    })

  return result
}
