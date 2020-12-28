import ws from 'ws'

/**
 * The list of all created clients.
 * @internal
 */
export const clients: WebSocketClient[] = []

/**
 * Close all the active connections.
 * @internal
 */
export const closeConnections = async () => {
  for (let client of clients) {
    if (client.connected) {
      await client.close()
    }
  }
}

/**
 * A WebSocket client.
 */
export class WebSocketClient {
  private _raw: ws
  private _connected: boolean
  private _message: any
  private _parse: (data: any) => any
  private _serialize: (data: any) => any

  constructor(
    path: string,
    parse = (data: any) => data,
    serialize = (data: any) => data,
    onOpen = (client: WebSocketClient) => {},
    headers?: { [key: string]: string }
  ) {
    this._connected = false
    this._parse = parse
    this._serialize = serialize
    this._raw = new ws(path, { headers })

    // Send pong when a ping is received
    this._raw.on('ping', () => this._raw.pong())

    // Parse and register the incoming message
    this._raw.on('message', data => {
      this._message = this._parse(data)
    })

    // Throw errors
    this._raw.on('error', error => {
      throw error
    })

    // Set connected to false when connection is closed
    this._raw.on('close', () => (this._connected = false))

    // Set connected to true when connected, and call onOpen() handler
    this._raw.on('open', () => {
      this._connected = true
      onOpen(this)
    })
  }

  /**
   * The raw ws instance.
   */
  get raw(): ws {
    return this._raw
  }

  /**
   * Whether the WebSocket is connected or not.
   */
  get connected(): boolean {
    return this._connected
  }

  /**
   * The newest or next WebSocket message.
   */
  get message(): Promise<any> {
    return new Promise(resolve => {
      // If a message already arrived, return it
      if (this._message) {
        resolve(this._message)

        // Clear the message
        return (this._message = undefined)
      } else {
        const listener = () => {
          // Wait for next tick
          process.nextTick(() => {
            // This ensures that the main message listener has
            // been executed
            resolve(this._message)
            // Clear the message
            this._message = undefined

            // Clear the listener
            this._raw.removeListener('message', listener)
          })
        }

        // Attach the listener
        this._raw.addListener('message', listener)
      }
    })
  }

  /**
   * Send a ping frame to the server. Returns a promise that resolves once a `pong`
   * response was received.
   * @param data The data to send along with the ping frame.
   * @param parse Whether to parse and serialize the sent and received data.
   *              Defaults to false.
   */
  ping(data?: any, parse: boolean = false): Promise<any> {
    return new Promise(resolve => {
      const pongListener = (data: any) => {
        // Resolve and clear the listener
        resolve(parse ? this._parse(data) : data)
        this._raw.removeListener('pong', pongListener)
      }

      // Register pong listerner
      this._raw.on('pong', pongListener)

      // Send a ping frame
      this._raw.ping(parse ? this._serialize(data) : data)
    })
  }

  /**
   * Send data through the websocket.
   * @param data The data to send.
   */
  send(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      // Serialize then send the message
      this._raw.send(this._serialize(data), error => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  /**
   * Close the websocket connection.
   */
  close(): Promise<void> {
    return new Promise(resolve => {
      const onClose = () => {
        this._raw.removeListener('close', onClose)

        resolve()
      }

      this._raw.on('close', onClose)

      this._raw.close()
      this._connected = false
    })
  }
}

/**
 * The config options for the WebSocket object.
 */
export interface WebSocketOptions {
  /**
   * Parser function executed on incoming messages.
   */
  parse?: (data: any) => any

  /**
   * Parser function executed on outgoing messages.
   */
  serialize?: (data: any) => any

  /**
   * HTTP headers to send with the 'Upgrade' request.
   */
  headers?: { [key: string]: string }
}

/**
 * Create a WebSocket connection.
 * @param path The path to connect to.
 * @param options The options for the WebSocket instance.
 */
export const WebSocket = (
  path: string,
  options?: WebSocketOptions
): Promise<WebSocketClient> => {
  return new Promise(resolve => {
    const client = new WebSocketClient(
      path,
      options?.parse,
      options?.serialize,
      resolve, // Resolve when the connection opens
      options?.headers
    )

    // Add the client to the list of clients so it can be closed when tests end
    clients.push(client)
  })
}
