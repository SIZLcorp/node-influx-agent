function readData (address, dataType) {
  let data
  let command = Buffer.from([0x54, 0x00])
  let set_data_Type = setDataType(dataType)
  let reserved = Buffer.from([0x00, 0x00])
  let block = Buffer.from([0x01, 0x00])
  let addr = Buffer.from(address, 'utf8')
  let addr_length = Buffer.from([addr.length, 0x00])
  let total_length = command.length + set_data_Type.length + reserved.length + block.length + addr_length.length + addr.length
  data = Buffer.concat([command, set_data_Type, reserved, block, addr_length, addr], total_length)
  // console.log('READ DATA', data)

  //   console.warn(`
  // COMMAND\t\t${printHEXPretty(command)}
  // DATA_TYPE\t${printHEXPretty(set_data_Type)}
  // reserved\t${printHEXPretty(reserved)}
  // block\t\t${printHEXPretty(block)}
  // addr\t\t${printHEXPretty(addr)}\t${addr}
  // addr_length\t${printHEXPretty(addr_length)}`)

  return data
}

function setDataType (dataType) {
  let temp
  switch (dataType) {
    case 'bit':
      temp = Buffer.from([0x00, 0x00])
      break
    case 'byte':
      temp = Buffer.from([0x01, 0x00])
      break
    case 'word':
      temp = Buffer.from([0x02, 0x00])
      break
    case 'dword':
      temp = Buffer.from([0x03, 0x00])
      break
    case 'lword':
      temp = Buffer.from([0x04, 0x00])
      break
    case 'seq':
      temp = Buffer.from([0x14, 0x00])
      break
  }
  return temp
}

module.exports = readData