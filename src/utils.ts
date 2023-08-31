export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export const getUnicodeHex = (char: string) => char.codePointAt(0)!.toString(16)

export const getEmoji = (unicodeHex: number) => String.fromCodePoint(unicodeHex)
