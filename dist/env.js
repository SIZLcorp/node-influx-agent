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
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPANY_CODE = exports.MACHINE_CODE = exports.REPEAT_INTERVAL = exports.EQUIPMENT_HOST = exports.EQUIPMENT_PORT = exports.INFLUX_BUCKET = exports.INFLUX_ORG = exports.INFLUX_TOKEN = exports.INFLUX_URL = void 0;
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
/** InfluxDB v2 URL */
exports.INFLUX_URL = process.env['INFLUX_URL'] || 'http://localhost:8086';
/** InfluxDB authorization token */
exports.INFLUX_TOKEN = process.env['INFLUX_TOKEN'] || 'my-token';
/** Organization within InfluxDB  */
exports.INFLUX_ORG = process.env['INFLUX_ORG'] || 'my-org';
/**InfluxDB bucket used in examples  */
exports.INFLUX_BUCKET = process.env['INFLUX_BUCKET'] || 'test_pms';
exports.EQUIPMENT_PORT = process.env['EQUIPMENT_PORT'] || 2004;
exports.EQUIPMENT_HOST = process.env['EQUIPMENT_HOST'] || '192.168.100.110';
exports.REPEAT_INTERVAL = process.env['REPEAT_INTERVAL'] || 500;
exports.MACHINE_CODE = process.env['MACHINE_CODE'] || 'E1';
exports.COMPANY_CODE = process.env['COMPANY_CODE'] || 'C1';
//# sourceMappingURL=env.js.map