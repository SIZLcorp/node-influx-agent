
export default function generateHeader(dataFrame: Buffer): Buffer {

  const companyId = Buffer.from('LGIS-GLOFA')
  const reserved1 = Buffer.from([])
  // const company_id = Buffer.from('LSIS-XGT')
  // const reserved1 = Buffer.from([0x00, 0x00])

  const PLCInfo = Buffer.from([0x00, 0x00])
  // XGK: 0xA0
  // XGI: 0XA4
  // XGR: 0xA8
  //0xB0
  const CPUInfo = Buffer.from([0xA0])
  const frameDir = Buffer.from([0x33])
  //0x33(client->PLC-server), 0x11(PLC-server->client)
  const InvokeID = Buffer.from([0x00, 0x00])
  const dataLength = Buffer.from([dataFrame.length, 0x00])
  const fenetPos = Buffer.from([0x00])
  const reserved2 = Buffer.from([0x00])
  const totalLength = companyId.length + reserved1.length + PLCInfo.length + CPUInfo.length +
    frameDir.length + InvokeID.length + dataLength.length + reserved2.length +
    fenetPos.length

  const generatedHeader = Buffer.concat([
    companyId,
    reserved1,
    PLCInfo,
    CPUInfo,
    frameDir,
    InvokeID,
    dataLength,
    reserved2,
    fenetPos], totalLength)

  return generatedHeader
}

