"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setDataType_1 = require("../util/setDataType");
function readData(address, dataType) {
    const command = Buffer.from([0x54, 0x00]);
    const dataTypeHEX = (0, setDataType_1.setDataType)(dataType);
    const reserved = Buffer.from([0x00, 0x00]);
    const block = Buffer.from([0x01, 0x00]);
    const addr = Buffer.from(address, 'utf8');
    const addrLength = Buffer.from([addr.length, 0x00]);
    const totalLength = command.length +
        dataTypeHEX.length +
        reserved.length +
        block.length +
        addrLength.length +
        addr.length;
    return Buffer.concat([
        command,
        dataTypeHEX,
        reserved,
        block,
        addrLength,
        addr
    ], totalLength);
}
exports.default = readData;
//# sourceMappingURL=read.js.map