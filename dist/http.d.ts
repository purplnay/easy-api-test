import { Server } from 'http'
import supertest from 'supertest'
/**
 * Get the config's server or throw an error if none was set.
 */
export declare const getServer: () => Server | Function
/**
 * A SuperTest Request object with some helper functions.
 */
export interface IRequest extends supertest.Request {
  /**
   * Helper function that adds an authorization header with value 'Bearer <token>'.
   * @param token The bearer token to add.
   */
  bearer: (token: string) => IRequest
  /**
   * Helper function that sets the Accept header to 'application/json'.
   */
  json: () => IRequest
}
/**
 * Generate a SuperTest requets and add some helper functions.
 * @param path The path to execute the request to.
 * @param method The method used for this request.
 */
export declare const getRequest: (
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
) => IRequest
/**
 * The SuperTest object.
 */
export declare const request: typeof supertest
/**
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
export declare const get: (path: string) => IRequest
/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
export declare const post: (path: string) => IRequest
/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const put: (path: string) => IRequest
/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const patch: (path: string) => IRequest
/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const del: (path: string) => IRequest
/**
 * Run an OPTIONS request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const options: (path: string) => IRequest
/**
 * Run an HEAD request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export declare const head: (path: string) => IRequest
