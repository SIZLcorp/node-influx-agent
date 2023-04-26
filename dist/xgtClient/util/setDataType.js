"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDataType = void 0;
function setDataType(dataType) {
    let temp;
    switch (dataType) {
        case 'bit':
            temp = Buffer.from([0x00, 0x00]);
            break;
        case 'byte':
            temp = Buffer.from([0x01, 0x00]);
            break;
        case 'word':
            temp = Buffer.from([0x02, 0x00]);
            break;
        case 'dword':
            temp = Buffer.from([0x03, 0x00]);
            break;
        case 'lword':
            temp = Buffer.from([0x04, 0x00]);
            break;
        case 'seq':
            temp = Buffer.from([0x14, 0x00]);
            break;
    }
    return temp;
}
exports.setDataType = setDataType;
//# sourceMappingURL=setDataType.js.map