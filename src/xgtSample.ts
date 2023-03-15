
const XGTClient = require('./xgtClient').XGTClient

const XGTConfig = {
  port: 2004,
  host: '192.168.100.110'
}
const device = new XGTClient()

device.readBit()
device.readCoil()

device.writeBit()