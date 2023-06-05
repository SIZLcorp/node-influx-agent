/* eslint-disable @typescript-eslint/no-this-alias */
import { XGTClientConfig, XGTAddressType, XGTDataTypeChar } from 'XGTClient'

import * as net from 'net'
import { XGTAddressGenerator, printHEXPretty } from './util'

import { parseReadRequest } from './util/requestParser'
import { parseReadResponse } from './util/responseParser'
import generateHeader from './generator/header'
import generateReadData from './generator/read'
import Debug from 'debug'
import { ErrnoException } from 'SutechEquipment'
const debug = Debug('su-agent:xgtClient')
const socketDebug = debug.extend('socket')
const connectionDebug = socketDebug.extend('connection')
import { EventEmitter } from 'node:events'

export type SocketStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'CONNECTING'
export class XGTClient extends EventEmitter {
  private static instance: XGTClient
  status: SocketStatus = 'DISCONNECTED'
  config: XGTClientConfig
  socket: net.Socket
  intervalConnect: NodeJS.Timer | null = null

  private constructor(config: XGTClientConfig) {
    super()

    const self = this
    this.config = config
    const socket = new net.Socket()

    this.socket = socket

    self.connect()



    // // Gracefully.. 프로세스 종료 감지시 disconnect 요청함
    // process.on('SIGINT', () => {
    //   console.warn('??????????')
    //   self.disconnect()
    //   process.exit()
    // })
  }
  public static getInstance(config: XGTClientConfig) {
    if (!this.instance) {
      this.instance = new XGTClient(config)
    }
    return this.instance
  }

  launchIntervalConnect() {
    if (this.intervalConnect) return
    this.intervalConnect = setInterval(this.connect.bind(this), 1000)
  }
  clearIntervalConnect() {
    if (!this.intervalConnect) return
    clearInterval(this.intervalConnect)
    this.intervalConnect = null
  }

  setStatus(status: SocketStatus) {
    const oldStatus = this.status
    if (oldStatus === 'CONNECTED' && status === 'DISCONNECTED') {
      this.emit('socket:disconnected')
    }
    if (oldStatus !== 'CONNECTED' && status === 'CONNECTED') {
      this.emit('socket:connected')
    }
    this.status = status

  }

  // 명시적으로 접속을 요청해야함 connect
  connect(): Promise<net.Socket> {

    const self = this
    const socket = self.socket

    socket.on('end', () => {
      self.disconnect()
    })
    socket.on('error', (err: ErrnoException) => {
      self.setStatus('ERROR')
      connectionDebug('소켓 에러', err)
      self.disconnect()
    })
    socket.on('close', () => {
      connectionDebug('소켓 close', self.status)
      self.disconnect()
    })

    connectionDebug('소켓 접속 !!', self.status)

    if (this.status === 'CONNECTED') {
      return Promise.reject(new Error('Already connected'))

    }
    return new Promise((resolve, reject) => {
      if (!socket.connecting) {
        const timeout = setTimeout(() => {
          connectionDebug('소켓 접속 시도 timeout')
          self.disconnect()
        }, 200)

        socket.once('connect', () => {
          clearTimeout(timeout)
          self.clearIntervalConnect()
          self.setStatus('CONNECTED')
          connectionDebug('소켓 접속됨')
          resolve(socket)
        })

        socket.connect(this.config)
        self.setStatus('CONNECTING')
        connectionDebug('소켓 접속 시도', this.config)
      } else {
        self.once('socket:connected', () => {
          resolve(socket)
        })
        self.once('socket:disconnected', () => {
          reject()
        })
      }
    })
  }

  // 명시적으로 접속 해제를 요청해야함, 프로그램 종료 감지시 disconnect 요청함
  disconnect(): void {
    this.setStatus('DISCONNECTED')
    connectionDebug('소켓 접속 끊음')
    this.socket.removeAllListeners('connect')
    this.socket.removeAllListeners('error')
    this.socket.removeAllListeners('close')
    this.socket.removeAllListeners('end')
    this.socket.destroy()
    this.launchIntervalConnect()
  }


  async readData(address: XGTAddressType, dataType: XGTDataTypeChar): Promise<number | null> {
    if (this.status !== 'CONNECTED') {
      return null
    }

    const dataAddr = XGTAddressGenerator(address, dataType)
    const temp = generateReadData(dataAddr, 'seq')

    const header = generateHeader(temp)
    const total_length = temp.length + header.length
    const reqData = Buffer.concat([header, temp], total_length)

    // debug(reqData)
    return this.request_data(reqData)
  }

  private async request_data(reqData: Buffer): Promise<number | null> {
    const self = this



    // TODO: 요청을 동시에 보내는걸 막아야 한다. 그렇다면 queue처럼 동작해야 할까?
    // 일단은 그렇게까지는 하지 말고, 내부적으로만 여러 요청이 동시에 가지 않는다고 가정만 하자..
    debug('[server] request from client: \n', printHEXPretty(reqData))
    parseReadRequest(reqData)

    return new Promise((resolve, reject) => {
      // timeout, error 처리
      const timeout = setTimeout(() => {
        self.disconnect()
        reject(new Error('timeout'))
      }, 100)

      self.socket?.once('data', serverData => {
        clearTimeout(timeout as NodeJS.Timeout)
        debug(`[client] received data from server: ${printHEXPretty(serverData)}`)
        const parsedResponse = parseReadResponse(serverData)
        //TODO: 값 해석해서 결과만 돌려줘야함
        resolve(parsedResponse?.body.data)
      })

      self.socket?.write(reqData)
    })
  }

  // async readSeqData() {

  // }
  // async writeData(address: XGTAddressType, dataType: XGTDataType, buf: Buffer): Promise<> {

  // }
  // async writeSeqData() {

  // }
}

// export {
//   readData,
//   writeData,
//   seqWriteData,
//   reqReadData
// }