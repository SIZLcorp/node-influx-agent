"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XGTAddressGenerator = exports.BufferSlicer = exports.printHEXPretty = void 0;
function printHEXPretty(str) {
    var _a;
    if (!str) {
        return '';
    }
    return (_a = str.toString('hex').match(/.{2}/g)) === null || _a === void 0 ? void 0 : _a.join(' ');
}
exports.printHEXPretty = printHEXPretty;
class BufferSlicer {
    constructor() {
        this.pointer = 0;
        this.pointer = 0;
    }
    getSlice(buf, size) {
        const ret = buf.subarray(0 + this.pointer, size + this.pointer);
        this.pointer += ret.length;
        return ret;
    }
    getPointer() {
        return this.pointer;
    }
}
exports.BufferSlicer = BufferSlicer;
function XGTAddressGenerator(inp, dataType) {
    var _a, _b;
    // inp에서 숫자와, 글자 분리
    const num = (_a = inp.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.join('');
    const str = (_b = inp.match(/[a-zA-Z]/)) === null || _b === void 0 ? void 0 : _b.join('');
    // 숫자는 multiplied by 2, 6자리 leftPad 0 인 문자로 변환
    const numStr = (Number(num) * 2).toString().padStart(6, '0');
    return `%${str}${dataType}${numStr}`;
}
exports.XGTAddressGenerator = XGTAddressGenerator;
//# sourceMappingURL=index.js.map