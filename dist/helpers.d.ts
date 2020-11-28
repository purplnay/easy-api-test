import { Server } from 'http'
import supertest from 'supertest'
/**
 * A helper function that returns a promise resolving after `time` ms.
 * @param time The time to wait in milliseconds.
 */
export declare const sleep: (time: number) => Promise<void>
/**
 * Local storage interface.
 */
export interface LocalStorage {
  /**
   * Get an item from the local storage.
   * @param key The key of the item to get.
   */
  getItem: (key: string) => any
  /**
   * Create or update an item in the local storage.
   * @param key The key of the item to set.
   * @param value The value of the item to set.
   */
  setItem: (key: string, value: any) => void
  /**
   * Remove an item from the local storage.
   * @param key The key of the item to remove.
   */
  removeItem: (key: string) => void
  /**
   * Remove all the items from the local storage.
   */
  clear: () => void
  [key: string]: any
}
/**
 * A localStorage object, similar to the one in the browser except that it
 * stores values as JSON objects, not as strings.
 */
export declare const localStorage: LocalStorage
/**
 * Get the config's server or throw an error if none was set.
 */
export declare const getServer: () => Server | Function
/**
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
export declare const get: (path: string) => supertest.Request
/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
export declare const post: (path: string) => supertest.Request
/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const put: (path: string) => supertest.Request
/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const patch: (path: string) => supertest.Request
/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const del: (path: string) => supertest.Request
