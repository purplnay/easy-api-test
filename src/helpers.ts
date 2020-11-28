import { Server } from 'http'
import supertest from 'supertest'
import { config } from './config'

/**
 * A helper function that returns a promise resolving after `time` ms.
 * @param time The time to wait in milliseconds.
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve()
      },
      time > 0 ? time : 0
    )
  })
}

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
export const localStorage: LocalStorage = {
  getItem(key: string) {
    const value = this[key]
    if (value !== undefined) {
      return value
    }
  },

  setItem(key: string, value: any) {
    if (typeof this[key] === 'function') return

    this[key] = JSON.parse(JSON.stringify(value))
  },

  removeItem(key: string) {
    if (typeof this[key] !== 'function') {
      delete this[key]
    }
  },

  clear() {
    Object.keys(this).forEach(key => {
      if (typeof this[key] !== 'function') {
        delete this[key]
      }
    })
  },
}

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
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
export const get = (path: string): supertest.Request => {
  const server = getServer()

  return supertest(server).get(path)
}

/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
export const post = (path: string): supertest.Request => {
  const server = getServer()

  return supertest(server).post(path)
}

/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const put = (path: string): supertest.Request => {
  const server = getServer()

  return supertest(server).put(path)
}

/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const patch = (path: string): supertest.Request => {
  const server = getServer()

  return supertest(server).patch(path)
}

/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
export const del = (path: string): supertest.Request => {
  const server = getServer()

  return supertest(server).delete(path)
}
