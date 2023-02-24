
function generateHeader (dataFrame) {
  // let company_id = Buffer.from('LSIS-XGT')
  // let reserved1 = Buffer.from([0x00, 0x00])

  let company_id = Buffer.from('LGIS-GLOFA')
  let reserved1 = Buffer.from([])
  let plc_info = Buffer.from([0x00, 0x00])
  // XGK: 0xA0
  // XGI: 0XA4
  // XGR: 0xA8
  //0xB0
  let cpu_info = Buffer.from([0xA0])
  let frame_dir = Buffer.from([0x33])
  //0x33(client->PLC-server), 0x11(PLC-server->client)
  let InvokeID = Buffer.from([0x00, 0x00])
  let data_length = Buffer.from([dataFrame.length, 0x00])
  let fenetPos = Buffer.from([0x00])
  let reserved2 = Buffer.from([0x00])
  let total_length = company_id.length + reserved1.length + plc_info.length + cpu_info.length +
    frame_dir.length + InvokeID.length + data_length.length + reserved2.length +
    fenetPos.length
  let data = Buffer.concat([
    company_id,
    reserved1,
    plc_info,
    cpu_info,
    frame_dir,
    InvokeID,
    data_length,
    reserved2,
    fenetPos], total_length)
  // console.log('COMPANY HEADER', data)

  //   console.warn(`
  // COMPANY_ID\t\t${printHEXPretty(company_id)} ${printHEXPretty(reserved1)} \t ${company_id}${reserved1}
  // PLC_INFO\t\t${printHEXPretty(plc_info)}
  // CPU_INFO\t\t${printHEXPretty(cpu_info)}
  // FRAME_DIR\t\t${printHEXPretty(frame_dir)}
  // INVOKE_ID\t\t${printHEXPretty(InvokeID)}
  // LENGTH\t\t\t${printHEXPretty(data_length)}
  // FENET_POS\t\t${printHEXPretty(fenetPos)}
  // RESERVED2\t\t${printHEXPretty(reserved2)}
  //   `)
  return data
}

module.exports = generateHeader