function writeData (address, dataType, tempData) {
  let command = Buffer.from([0x58, 0x00])
  let set_data_Type = setDataType(dataType)
  let reserved = Buffer.from([0x00, 0x00])
  let block = Buffer.from([0x01, 0x00])
  let addr = Buffer.from(address, 'utf8')
  let addr_length = Buffer.from([addr.length, 0x00])
  let data = Buffer.from(tempData, 'utf-8')
  let data_length = Buffer.from([data.length, 0x00])
  let total_length = command.length + set_data_Type.length + reserved.length + block.length + addr_length.length + addr.length + data.length + data_length.length
  data = Buffer.concat([command, set_data_Type, reserved, block, addr_length, addr, data_length, data], total_length)
  console.log(data)
  return data
}

module.exports = writeData