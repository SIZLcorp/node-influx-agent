import net from 'net'

import { parseWriteRequest } from '../util/requestParser'
import { parseWriteResponse } from '../util/responseParser'
import { printHEXPretty, XGTAddressGenerator } from '../util'
import generateHeader from '../generator/header'
import generateWriteData from '../generator/write'

const XGTSocket = net.createConnection({ port: 2004, host: '192.168.100.110' })
XGTSocket.on('connect', () => {
  console.log('========= CONNECTED!')
  let dataAddr = XGTAddressGenerator('C12', 'B')
  let temp = generateWriteData(dataAddr, 'seq', Buffer.from([0x12, 0x00]))

  let header = generateHeader(temp)
  let total_length = temp.length + header.length
  let reqData = Buffer.concat([header, temp], total_length)

  // console.log(reqData)
  request_data(reqData)
})

XGTSocket.on('data', serverData => {
  console.log(`[client] received data from server: 
${printHEXPretty(serverData)}`)
  parseWriteResponse(serverData)
  XGTSocket.destroy()
})


function request_data(reqData: Buffer) {
  console.log('[server] request from client: \n', printHEXPretty(reqData))
  parseWriteRequest(reqData)
  XGTSocket.write(reqData)
}
