import { Server } from 'http'
import supertest from 'supertest'
import { config } from './config'

/**
 * Get the config's server or throw an error if none was set.
 */
export const getServer = (): Server | Function => {
  if (config.app === null) {
    if (config.log) {
      process.stdout.write(
        `\nYou must declare which server to use in order to use requests.\n`.red
      )
      process.stdout.write('You can declare it with the `use()` function.\n')
    }

    throw new Error('No server provided.')
  }

  return config.app
}

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
export const getRequest = (
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
): IRequest => {
  // Build the request
  const server = getServer()
  const request = (supertest(server)[method](path) as unknown) as IRequest

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
