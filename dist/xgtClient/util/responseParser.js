"use strict";
/**
 * 응답 값을 분석하는 용도의 유틸리티 함수
 *
 * 들어온 응답값을 규칙에 따라 파싱해보고 파싱된 결과를 로깅함으로써 빨리 파악할 수 있도록
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWriteResponse = exports.parseReadResponse = void 0;
const _1 = require(".");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("su-agent:xgtClient:responseParser");
function parseReadResponse(buf) {
    const slicer = new _1.BufferSlicer();
    debug(`<< PARSED RESPONSE`);
    // HEADER
    const company_id = slicer.getSlice(buf, 10);
    const plc_info = slicer.getSlice(buf, 2);
    const cpu_info = slicer.getSlice(buf, 1);
    const frame_dir = slicer.getSlice(buf, 1);
    const InvokeID = slicer.getSlice(buf, 2);
    const data_length = slicer.getSlice(buf, 2);
    const fenetPos = slicer.getSlice(buf, 1);
    const reserved2 = slicer.getSlice(buf, 1);
    debug(`====HEADER====
COMPANY_ID\t\t${(0, _1.printHEXPretty)(company_id)}\t ${company_id}
PLC_INFO\t\t${(0, _1.printHEXPretty)(plc_info)}
CPU_INFO\t\t${(0, _1.printHEXPretty)(cpu_info)}
FRAME_DIR\t\t${(0, _1.printHEXPretty)(frame_dir)}
INVOKE_ID\t\t${(0, _1.printHEXPretty)(InvokeID)}
LENGTH\t\t\t${(0, _1.printHEXPretty)(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${(0, _1.printHEXPretty)(fenetPos)}
RESERVED2\t\t${(0, _1.printHEXPretty)(reserved2)}`);
    // BODY
    const command = slicer.getSlice(buf, 2);
    const type = slicer.getSlice(buf, 2);
    const block = slicer.getSlice(buf, 2);
    const error_status = slicer.getSlice(buf, 2);
    const value = slicer.getSlice(buf, 2);
    const data_size = slicer.getSlice(buf, 2);
    const data = buf.subarray(slicer.getPointer());
    debug(`====BODY====
명령어\t\t\t${(0, _1.printHEXPretty)(command)}
데이터타입\t\t${(0, _1.printHEXPretty)(type)}
예약영역\t\t${(0, _1.printHEXPretty)(block)}
에러상태\t\t${(0, _1.printHEXPretty)(error_status)}
에러정보\t\t${(0, _1.printHEXPretty)(value)}`);
    if (data_size) {
        debug(`데이터크기\t\t${(0, _1.printHEXPretty)(data_size)} \t${data_size.readIntLE(0, data_size.length)}
데이터\t\t\t${(0, _1.printHEXPretty)(data)} \t${data.readIntLE(0, data.length)}`);
    }
    return {
        header: {
            company_id: company_id.toString(),
            plc_info: plc_info.readIntLE(0, plc_info.length),
            cpu_info: cpu_info.toString(),
            frame_dir: frame_dir.toString(),
            InvokeID: InvokeID.readIntLE(0, InvokeID.length),
            data_length: data_length.readIntLE(0, data_length.length),
            fenetPos: fenetPos.toString(),
            // reserved2: reserved2.toString()
        },
        body: Object.assign(Object.assign({ command: command.readIntLE(0, command.length), type: type.readIntLE(0, type.length), 
            // block,
            error_status: error_status.readIntLE(0, error_status.length), value: value.readIntLE(0, value.length) }, (data_size && {
            data_size: data_size.readIntLE(0, data_size.length),
        })), (data && {
            data: data.readIntLE(0, data.length)
        }))
    };
}
exports.parseReadResponse = parseReadResponse;
function parseWriteResponse(buf) {
    const slicer = new _1.BufferSlicer();
    debug(`<< PARSED RESPONSE`);
    // HEADER
    const company_id = slicer.getSlice(buf, 10);
    const plc_info = slicer.getSlice(buf, 2);
    const cpu_info = slicer.getSlice(buf, 1);
    const frame_dir = slicer.getSlice(buf, 1);
    const InvokeID = slicer.getSlice(buf, 2);
    const data_length = slicer.getSlice(buf, 2);
    const fenetPos = slicer.getSlice(buf, 1);
    const reserved2 = slicer.getSlice(buf, 1);
    debug(`====HEADER====
COMPANY_ID\t\t${(0, _1.printHEXPretty)(company_id)}\t ${company_id}
PLC_INFO\t\t${(0, _1.printHEXPretty)(plc_info)}
CPU_INFO\t\t${(0, _1.printHEXPretty)(cpu_info)}
FRAME_DIR\t\t${(0, _1.printHEXPretty)(frame_dir)}
INVOKE_ID\t\t${(0, _1.printHEXPretty)(InvokeID)}
LENGTH\t\t\t${(0, _1.printHEXPretty)(data_length)} \t${data_length.readIntLE(0, data_length.length)}
FENET_POS\t\t${(0, _1.printHEXPretty)(fenetPos)}
RESERVED2\t\t${(0, _1.printHEXPretty)(reserved2)}`);
    // BODY
    const command = slicer.getSlice(buf, 2);
    const type = slicer.getSlice(buf, 2);
    const block = slicer.getSlice(buf, 2);
    const error_status = slicer.getSlice(buf, 2);
    const value = slicer.getSlice(buf, 2);
    debug(`====BODY====
명령어\t\t\t${(0, _1.printHEXPretty)(command)}
데이터타입\t\t${(0, _1.printHEXPretty)(type)}
예약영역\t\t${(0, _1.printHEXPretty)(block)}
에러상태\t\t${(0, _1.printHEXPretty)(error_status)}
에러정보/변수개수\t\t${(0, _1.printHEXPretty)(value)}
`);
}
exports.parseWriteResponse = parseWriteResponse;
//# sourceMappingURL=responseParser.js.map