"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setDataType_1 = require("../util/setDataType");
function writeData(address, dataType, buf) {
    const command = Buffer.from([0x58, 0x00]);
    const dataTypeHEX = (0, setDataType_1.setDataType)(dataType);
    const reserved = Buffer.from([0x00, 0x00]);
    const block = Buffer.from([0x01, 0x00]);
    const addr = Buffer.from(address, 'utf8');
    const addrLength = Buffer.from([addr.length, 0x00]);
    const bufferLength = Buffer.from([buf.length, 0x00]);
    const totalLength = command.length +
        dataTypeHEX.length +
        reserved.length +
        block.length +
        addrLength.length +
        addr.length +
        bufferLength.length + 2;
    return Buffer.concat([
        command,
        dataTypeHEX,
        reserved,
        block,
        addrLength,
        addr,
        bufferLength,
        buf
    ], totalLength);
}
exports.default = writeData;
//# sourceMappingURL=write.js.map