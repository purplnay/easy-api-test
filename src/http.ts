import { parse } from 'url'
import supertest from 'supertest'
import { config } from './config'

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
 * @internal
 */
export const getRequest = (
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
): IRequest => {
  // Build the request
  let app: supertest.SuperTest<supertest.Test>
  const url = parse(path)

  if (url.host) {
    app = supertest(`${url.protocol}//${url.host}`)
  } else {
    if (typeof config.app === 'undefined') {
      throw new Error(
        `No target server or function provided for the requet and ${path} does not contain a hostname.`
      )
    }

    app = supertest(config.app)
  }

  const request = (app[method](path) as unknown) as IRequest

  // Add the `bearer()` method.
  request.bearer = (token: string): IRequest => {
    return request.set('Authorization', `Bearer ${token}`)
  }

  // Add the `json()` method.
  request.json = (): IRequest => {
    return request.set('Accept', 'application/json')
  }

  return request
}

/**
 * The SuperTest object.
 */
export const request = supertest

/**
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
export const get = (path: string): IRequest => {
  return getRequest(path, 'get')
}

/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
export const post = (path: string): IRequest => {
  return getRequest(path, 'post')
}

/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const put = (path: string): IRequest => {
  return getRequest(path, 'put')
}

/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const patch = (path: string): IRequest => {
  return getRequest(path, 'patch')
}

/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const del = (path: string): IRequest => {
  return getRequest(path, 'delete')
}

/**
 * Run an OPTIONS request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const options = (path: string): IRequest => {
  return getRequest(path, 'options')
}

/**
 * Run an HEAD request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const head = (path: string): IRequest => {
  return getRequest(path, 'head')
}
