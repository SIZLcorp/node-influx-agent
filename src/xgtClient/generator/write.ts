import { XGTProtocolAddressType, XGTDataType } from "XGTClient"
import { setDataType } from "../util/setDataType"

export default function writeData(address: XGTProtocolAddressType, dataType: XGTDataType, buf: Buffer) {
  const command = Buffer.from([0x58, 0x00])
  const dataTypeHEX = setDataType(dataType)
  const reserved = Buffer.from([0x00, 0x00])
  const block = Buffer.from([0x01, 0x00])
  const addr = Buffer.from(address, 'utf8')
  const addrLength = Buffer.from([addr.length, 0x00])
  const bufferLength = Buffer.from([buf.length, 0x00])
  const totalLength = command.length +
    dataTypeHEX.length +
    reserved.length +
    block.length +
    addrLength.length +
    addr.length +
    bufferLength.length + 2

  return Buffer.concat([
    command,
    dataTypeHEX,
    reserved,
    block,
    addrLength,
    addr,
    bufferLength,
    buf
  ], totalLength)

}
