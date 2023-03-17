const { printHEXPretty } = require('../util')

function parseReadRequest (buf) {
  let pointer = 0
  function getSlice (buf, size) {
    const ret = buf.subarray(0 + pointer, size + pointer)
    pointer += ret.length
    return ret
  }

  console.warn(`>> PARSED REQUEST`)

  const company_id = getSlice(buf, 10)
  const plc_info = getSlice(buf, 2)
  const cpu_info = getSlice(buf, 1)
  const frame_dir = getSlice(buf, 1)
  const InvokeID = getSlice(buf, 2)
  const data_length = getSlice(buf, 2)
  const fenetPos = getSlice(buf, 1)
  const reserved2 = getSlice(buf, 1)

  console.warn(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY

  const command = getSlice(buf, 2)
  const type = getSlice(buf, 2)
  const block = getSlice(buf, 2)
  const num = getSlice(buf, 2)
  //   const value = getSlice(buf, 2)
  //   const data_size = getSlice(buf, 2)
  const data = buf.subarray(pointer)

  console.warn(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
변수길이\t\t${printHEXPretty(num)}
데이터\t\t\t${printHEXPretty(data)}\t${data}`)
}

function parseWriteRequest (buf) {
  let pointer = 0
  function getSlice (buf, size) {
    const ret = buf.subarray(0 + pointer, size + pointer)
    pointer += ret.length
    return ret
  }

  console.warn(`>> PARSED REQUEST`)

  const company_id = getSlice(buf, 10)
  const plc_info = getSlice(buf, 2)
  const cpu_info = getSlice(buf, 1)
  const frame_dir = getSlice(buf, 1)
  const InvokeID = getSlice(buf, 2)
  const data_length = getSlice(buf, 2)
  const fenetPos = getSlice(buf, 1)
  const reserved2 = getSlice(buf, 1)

  console.warn(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY

  const command = getSlice(buf, 2)
  const type = getSlice(buf, 2)
  const block = getSlice(buf, 2)
  const num = getSlice(buf, 2)
  const name_len = getSlice(buf, 2)
  console.log(name_len)
  const name = getSlice(buf, 9)
  const data_size = getSlice(buf,2)
  //   const value = getSlice(buf, 2)
  //   const data_size = getSlice(buf, 2)
  const data = buf.subarray(pointer)

  console.warn(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
변수개수\t\t${printHEXPretty(num)}
변수명길이\t\t\t${printHEXPretty(name_len)}
변수명\t\t\t${printHEXPretty(name)}
데이터크기\t\t\t${printHEXPretty(data_size)}\t
데이터\t\t\t${printHEXPretty(data)}\t${data}`)
}

module.exports = {parseReadRequest, parseWriteRequest}