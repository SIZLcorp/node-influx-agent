"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const util_1 = require("../util");
const requestParser_1 = require("../util/requestParser");
const responseParser_1 = require("../util/responseParser");
const header_1 = __importDefault(require("../generator/header"));
const read_1 = __importDefault(require("../generator/read"));
const XGTSocket = net.createConnection({ port: 2004, host: '192.168.100.110' });
XGTSocket.on('connect', () => {
    console.log('========= CONNECTED!');
    let dataAddr = (0, util_1.XGTAddressGenerator)('C12', 'B');
    // %CB000024' // 왜 이렇게? 알고싶었던 것은 C12
    let temp = (0, read_1.default)(dataAddr, 'seq');
    let header = (0, header_1.default)(temp);
    let total_length = temp.length + header.length;
    let reqData = Buffer.concat([header, temp], total_length);
    // console.log(reqData)
    request_data(reqData);
});
XGTSocket.on('data', serverData => {
    console.log(`[client] received data from server: 
${(0, util_1.printHEXPretty)(serverData)}`);
    (0, responseParser_1.parseReadResponse)(serverData);
    XGTSocket.destroy();
});
function request_data(reqData) {
    console.log('[server] request from client: \n', (0, util_1.printHEXPretty)(reqData));
    (0, requestParser_1.parseReadRequest)(reqData);
    XGTSocket.write(reqData);
}
//# sourceMappingURL=readSample.js.map