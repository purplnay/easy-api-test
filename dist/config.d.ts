/// <reference types="node" />
import { Server } from 'http'
/**
 * The test session configuration.
 */
export declare const config: {
  exitOnFailure: boolean
  log: boolean
  app: Server | Function | null
}
/**
 * Disable the logs to the console.
 */
export declare const disableLogs: () => void
/**
 * Exit the test session if a test fails.
 * The end handlers would still be executed before exiting.
 */
export declare const exitOnFailure: () => void
/**
 * Define which server or server handler (e.g an Express app) to use.
 * @param app The server instance or server handler to use.
 */
export declare const use: (app: Server | Function) => void
