import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
/** InfluxDB v2 URL */
export const INFLUX_URL = process.env['INFLUX_URL'] || 'http://localhost:8086'
/** InfluxDB authorization token */
export const INFLUX_TOKEN = process.env['INFLUX_TOKEN'] || 'my-token'
/** Organization within InfluxDB  */
export const INFLUX_ORG = process.env['INFLUX_ORG'] || 'my-org'
/**InfluxDB bucket used in examples  */
export const INFLUX_BUCKET = process.env['INFLUX_BUCKET'] || 'test_pms'


export const EQUIPMENT_PORT = Number(process.env['EQUIPMENT_PORT']) || 2004
export const EQUIPMENT_HOST = process.env['EQUIPMENT_HOST'] || '192.168.100.160'
export const EQUIPMENT_DESCRIPTION = process.env['EQUIPMENT_DESCRIPTION']

export const REPEAT_INTERVAL = Number(process.env['REPEAT_INTERVAL']) || 500

export const MACHINE_CODE = process.env['MACHINE_CODE'] || 'E1'
export const COMPANY_CODE = process.env['COMPANY_CODE'] || 'C1'