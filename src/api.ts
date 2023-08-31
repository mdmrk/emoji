import { randomFloat } from './utils'

export const getEmojiImage = (unicode: string) => {
  const filePath = `src/assets/emoji/0x${unicode.codePointAt(0)!.toString(16)}.png`

  setTimeout(() => {}, randomFloat(1, 3) * 1000)
  return filePath
}
