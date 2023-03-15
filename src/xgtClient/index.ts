import { XGTClientConfig, XGTDataType, XGTAddressType } from "XGTClient"

import net from 'net'



type SocketStatus = 'CONNECTED' | 'DISCONNECTED'
class XGTClient {
  private static instance: XGTClient
  socket: net.Socket | null = null
  status: SocketStatus = 'DISCONNECTED'
  config: XGTClientConfig
  private constructor(config: XGTClientConfig) {
    this.config = config
  }
  public static getInstance(config: XGTClientConfig) {
    if (!this.instance) {
      this.instance = new XGTClient(config)
    }
    return this.instance
  }

  // 명시적으로 접속을 요청해야함 connect
  connect(): Promise<net.Socket> {
    const socket = net.createConnection(this.config)
    const self = this
    this.socket = socket
    // Gracefully.. 프로세스 종료 감지시 disconnect 요청함
    process.on('SIGINT', () => {
      self.disconnect()
    })
    return new Promise((resolve, reject) => {
      socket.once('connect', () => {
        this.status = 'CONNECTED'
        resolve(socket)
      })
      socket.once("error", (err) => {
        reject(err)
      })
      socket.once('close', () => {
        this.status = 'DISCONNECTED'
      })
    })


  }

  // 명시적으로 접속 해제를 요청해야함, 프로그램 종료 감지시 disconnect 요청함
  disconnect(): void {
    if (this.socket) {
      this.socket.destroy()
      this.socket = null
    }
  }


  async readData(address: XGTAddressType, dataType: XGTDataType): Promise<Buffer> {
    if (this.status !== 'CONNECTED') {
      this.socket = await this.connect()
    }
  }
  async readSeqData() {

  }
  async writeData(address: XGTAddressType, dataType: XGTDataType, buf: Buffer): Promise<> {

  }
  async writeSeqData() {

  }
}

// export {
//   readData,
//   writeData,
//   seqWriteData,
//   reqReadData
// }