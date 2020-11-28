import { Server } from 'http'

/**
 * The test session configuration.
 * @internal
 */
export const config: {
  exitOnFail: boolean
  log: boolean
  app: Server | Function | null
} = {
  exitOnFail: false,
  log: true,
  app: null,
}

/**
 * Disable the logs to the console.
 */
export const disableLogs = (): void => {
  config.log = false
}

/**
 * Exit the test session if a test fails.
 * The end handlers would still be executed before exiting.
 */
export const exitOnFailure = (): void => {
  config.exitOnFail = false
}

/**
 * Define which server or server handler (e.g an Express app) to use.
 * @param app The server instance or server handler to use.
 */
export const use = (app: Server | Function): void => {
  config.app = app
}
