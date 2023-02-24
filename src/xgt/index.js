const net = require('net')

const parseRequest = require('./parse/request')
const parseResponse = require('./parse/response')
const { printHEXPretty } = require('./util')
const generateHeader = require('./generate/header')
const generateReadData = require('./generate/read')

const XGTSocket = net.createConnection({ port: 2004, host: '192.168.100.110' })
XGTSocket.on('connect', () => {
  console.log('========= CONNECTED!')
  let dataAddr = '%CB000024' // 왜 이렇게? 알고싶었던 것은 C12
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
  parseResponse(serverData)
  XGTSocket.destroy()
})


function request_data (reqData) {
  console.log('[server] request from client: \n', printHEXPretty(reqData))
  parseRequest(reqData)
  XGTSocket.write(reqData)
}
