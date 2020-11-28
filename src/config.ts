import { Server } from 'http'

/**
 * The test session configuration.
 */
export const config: {
  exitOnFailure: boolean
  log: boolean
  app: Server | Function | null
} = {
  exitOnFailure: false,
  log: true,
  app: null,
}

/**
 * Disable the logs to the console.
 */
export const disableLogs = () => {
  config.log = false
}

/**
 * Exit the test session if a test fails.
 * The end handlers would still be executed before exiting.
 */
export const exitOnFailure = (): void => {
  config.exitOnFailure = false
}

/**
 * Define which server or server handler (e.g an Express app) to use.
 * @param app The server instance or server handler to use.
 */
export const use = (app: Server | Function): void => {
  config.app = app
}
