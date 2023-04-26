"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const requestParser_1 = require("../util/requestParser");
const responseParser_1 = require("../util/responseParser");
const util_1 = require("../util");
const header_1 = __importDefault(require("../generator/header"));
const write_1 = __importDefault(require("../generator/write"));
const XGTSocket = net_1.default.createConnection({ port: 2004, host: '192.168.100.110' });
XGTSocket.on('connect', () => {
    console.log('========= CONNECTED!');
    let dataAddr = (0, util_1.XGTAddressGenerator)('C12', 'B');
    let temp = (0, write_1.default)(dataAddr, 'seq', Buffer.from([0x12, 0x00]));
    let header = (0, header_1.default)(temp);
    let total_length = temp.length + header.length;
    let reqData = Buffer.concat([header, temp], total_length);
    // console.log(reqData)
    request_data(reqData);
});
XGTSocket.on('data', serverData => {
    console.log(`[client] received data from server: 
${(0, util_1.printHEXPretty)(serverData)}`);
    (0, responseParser_1.parseWriteResponse)(serverData);
    XGTSocket.destroy();
});
function request_data(reqData) {
    console.log('[server] request from client: \n', (0, util_1.printHEXPretty)(reqData));
    (0, requestParser_1.parseWriteRequest)(reqData);
    XGTSocket.write(reqData);
}
//# sourceMappingURL=writeSample.js.map