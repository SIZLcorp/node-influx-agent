import * as net from 'net'
import { XGTAddressGenerator, printHEXPretty } from '../util'

import { parseReadRequest } from '../util/requestParser'
import { parseReadResponse } from '../util/responseParser'
import generateHeader from '../generator/header'
import generateReadData from '../generator/read'

const XGTSocket = net.createConnection({ port: 2004, host: '192.168.100.110' })
XGTSocket.on('connect', () => {
  console.log('========= CONNECTED!')
  let dataAddr = XGTAddressGenerator('C12', 'B')
  // %CB000024' // 왜 이렇게? 알고싶었던 것은 C12
  let temp = generateReadData(dataAddr, 'seq')

  let header = generateHeader(temp)
  let total_length = temp.length + header.length
  let reqData = Buffer.concat([header, temp], total_length)

  // console.log(reqData)
  request_data(reqData)
})

XGTSocket.on('data', serverData => {
  console.log(`[client] received data from server: 
${printHEXPretty(serverData)}`)
  parseReadResponse(serverData)
  XGTSocket.destroy()
})


function request_data(reqData: Buffer) {
  console.log('[server] request from client: \n', printHEXPretty(reqData))
  parseReadRequest(reqData)
  XGTSocket.write(reqData)
}
