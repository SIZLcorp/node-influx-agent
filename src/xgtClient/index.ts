import { XGTClientConfig, XGTDataType, XGTAddressType, XGTDataTypeChar } from "XGTClient"

import * as net from 'net'
import { XGTAddressGenerator, printHEXPretty } from './util'

import { parseReadRequest } from './util/requestParser'
import { parseReadResponse } from './util/responseParser'
import generateHeader from './generator/header'
import generateReadData from './generator/read'
import Debug from "debug"
const debug = Debug("su-agent:xgtClient")
const connectionDebug = debug.extend('connection')
type SocketStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'CONNECTING'
export class XGTClient {
  private static instance: XGTClient
  socket: net.Socket | null = null
  status: SocketStatus = 'DISCONNECTED'
  config: XGTClientConfig

  private constructor(config: XGTClientConfig) {
    const self = this
    this.config = config

    // Gracefully.. 프로세스 종료 감지시 disconnect 요청함
    process.on('SIGINT', () => {
      self.disconnect()
      process.exit()
    })
  }
  public static getInstance(config: XGTClientConfig) {
    if (!this.instance) {
      this.instance = new XGTClient(config)
    }
    return this.instance
  }

  // 명시적으로 접속을 요청해야함 connect
  connect(): Promise<net.Socket> {
    const self = this
    if (this.status !== 'DISCONNECTED') {
      return Promise.reject(new Error('Already connected'))
    }
    const socket = net.createConnection(this.config)
    this.socket = socket
    this.status = 'CONNECTING'
    connectionDebug('소켓 접속', this.config)

    return new Promise((resolve, reject) => {
      socket.once('connect', () => {
        self.status = 'CONNECTED'
        connectionDebug('소켓 접속됨')

        resolve(socket)
      })
      socket.once("error", (err) => {
        self.status = 'ERROR'
        connectionDebug('소켓 에러', err)
        self.disconnect()
        // TODO: 다시 켰을떄, 에러시 재접속해야함..
        process.kill(process.pid, 'SIGINT')
        reject(err)
      })
      socket.once('close', () => {
        self.status = 'DISCONNECTED'
        connectionDebug('소켓 close', self.status)
      })
      // TODO: timeout 이벤트 받아야함
      // socket.once('drop')
    })


  }

  // 명시적으로 접속 해제를 요청해야함, 프로그램 종료 감지시 disconnect 요청함
  disconnect(): void {
    if (this.socket) {
      this.socket.destroy()
      this.socket = null
      this.status = 'DISCONNECTED'
    }
  }


  async readData(address: XGTAddressType, dataType: XGTDataTypeChar): Promise<number> {
    let dataAddr = XGTAddressGenerator(address, dataType)
    let temp = generateReadData(dataAddr, 'seq')

    let header = generateHeader(temp)
    let total_length = temp.length + header.length
    let reqData = Buffer.concat([header, temp], total_length)

    // debug(reqData)
    return this.request_data(reqData)
  }

  private async request_data(reqData: Buffer): Promise<number> {
    const self = this
    // TODO: 요청을 동시에 보내는걸 막아야 한다. 그렇다면 queue처럼 동작해야 할까?
    // 일단은 그렇게까지는 하지 말고, 내부적으로만 여러 요청이 동시에 가지 않는다고 가정만 하자..
    if (this.status == 'DISCONNECTED') {
      await this.connect()
    }

    debug('[server] request from client: \n', printHEXPretty(reqData))
    parseReadRequest(reqData)

    return new Promise((resolve, reject) => {
      self.socket!.once('data', serverData => {
        debug(`[client] received data from server: 
      ${printHEXPretty(serverData)}`)
        const parsedResponse = parseReadResponse(serverData)
        //TODO: 값 해석해서 결과만 돌려줘야함
        resolve(parsedResponse?.body.data)
      })

      self.socket!.write(reqData)
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