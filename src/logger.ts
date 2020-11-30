import { config } from './config'

/**
 * Write a line to stdout.
 * @param text The text to write to stdout.
 * @internal
 */
export const writeLine = (text: string) => {
  if (config.log) {
    process.stdout.write(text)
  }
}

/**
 * Clear the current line on stdout.
 * @internal
 */
export const clearLine = () => {
  if (config.log) {
    process.stdout.cursorTo(0)
  }
}

/**
 * Create a new line on stdout.
 * @internal
 */
export const newLine = () => {
  if (config.log) {
    process.stdout.write('\n')
  }
}
