/**
 * Write a line to stdout.
 * @param text The text to write to stdout.
 * @internal
 */
export const writeLine = (text: string) => {
  process.stdout.write(text)
}

/**
 * Clear the current line on stdout.
 * @internal
 */
export const clearLine = () => {
  process.stdout.cursorTo(0)
}

/**
 * Create a new line on stdout.
 * @internal
 */
export const newLine = () => {
  process.stdout.write('\n')
}
