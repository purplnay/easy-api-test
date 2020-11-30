/**
 * The test session configuration.
 * @internal
 */
export const config: {
  log: boolean
  url: string | null
} = {
  log: true,
  url: null,
}

/**
 * Disable the logs to the console.
 */
export const disableLogs = (): void => {
  config.log = false
}

/**
 * Define which base URL to use for the request helper functions.
 * @param app The base URL to use.
 */
export const use = (url: string): void => {
  // Remove last slash if any
  if (url.endsWith('/')) {
    config.url = url.replace(/[/]+$/i, '')
  } else {
    config.url = url
  }
}
