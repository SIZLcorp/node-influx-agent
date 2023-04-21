/** 
 * 요청값이 잘 만들어졌는지 확인 등의 용도로 사용하는 유틸리티 함수
 * 
 * 만들어진 요청값이 잘 만들어 진건지 규칙에 따라 파싱해보고 파싱된 결과를 로깅함으로써 빨리 파악할 수 있도록 
 * */

import { printHEXPretty, BufferSlicer } from '.'
import Debug from "debug"
const debug = Debug("su-agent:xgtClient:requestParser")

export function parseReadRequest(buf: Buffer): void {
  const slicer = new BufferSlicer()

  debug(`>> PARSED REQUEST`)

  const company_id = slicer.getSlice(buf, 10)
  const plc_info = slicer.getSlice(buf, 2)
  const cpu_info = slicer.getSlice(buf, 1)
  const frame_dir = slicer.getSlice(buf, 1)
  const InvokeID = slicer.getSlice(buf, 2)
  const data_length = slicer.getSlice(buf, 2)
  const fenetPos = slicer.getSlice(buf, 1)
  const reserved2 = slicer.getSlice(buf, 1)

  debug(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY
  const command = slicer.getSlice(buf, 2)
  const type = slicer.getSlice(buf, 2)
  const block = slicer.getSlice(buf, 2)
  const num = slicer.getSlice(buf, 2)
  const data_size = slicer.getSlice(buf, 2)
  const data = buf.subarray(slicer.getPointer())

  debug(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
변수개수\t\t${printHEXPretty(num)}
변수명길이\t\t${printHEXPretty(data_size)}
데이터(변수)\t\t${printHEXPretty(data)}\t${data}`)
}

export function parseWriteRequest(buf: Buffer): void {
  const slicer = new BufferSlicer()


  debug(`>> PARSED REQUEST`)

  const company_id = slicer.getSlice(buf, 10)
  const plc_info = slicer.getSlice(buf, 2)
  const cpu_info = slicer.getSlice(buf, 1)
  const frame_dir = slicer.getSlice(buf, 1)
  const InvokeID = slicer.getSlice(buf, 2)
  const data_length = slicer.getSlice(buf, 2)
  const fenetPos = slicer.getSlice(buf, 1)
  const reserved2 = slicer.getSlice(buf, 1)

  debug(`====HEADER====
COMPANY_ID\t\t${printHEXPretty(company_id)}\t ${company_id}
PLC_INFO\t\t${printHEXPretty(plc_info)}
CPU_INFO\t\t${printHEXPretty(cpu_info)}
FRAME_DIR\t\t${printHEXPretty(frame_dir)}
INVOKE_ID\t\t${printHEXPretty(InvokeID)}
LENGTH\t\t\t${printHEXPretty(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${printHEXPretty(fenetPos)}
RESERVED2\t\t${printHEXPretty(reserved2)}`)


  // BODY

  const command = slicer.getSlice(buf, 2)
  const type = slicer.getSlice(buf, 2)
  const block = slicer.getSlice(buf, 2)
  const num = slicer.getSlice(buf, 2)
  const name_len = slicer.getSlice(buf, 2)
  const name = slicer.getSlice(buf, 9)
  const data_size = slicer.getSlice(buf, 2)
  //   const value = slicer.getSlice(buf, 2)
  //   const data_size = slicer.getSlice(buf, 2)
  const data = buf.subarray(slicer.getPointer())

  debug(`====BODY====
명령어\t\t\t${printHEXPretty(command)}
데이터타입\t\t${printHEXPretty(type)}
예약영역\t\t${printHEXPretty(block)}
변수개수\t\t${printHEXPretty(num)}
변수명길이\t\t\t${printHEXPretty(name_len)}
변수명\t\t\t${printHEXPretty(name)}
데이터크기\t\t\t${printHEXPretty(data_size)}\t
데이터\t\t\t${printHEXPretty(data)}\t${data}`)
}

