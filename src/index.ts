const { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } = require('./env')
import { MACHINE_CODE, COMPANY_CODE } from "./env"

import { InfluxClient } from "./influxClient"
import { mappingSetting } from "./setting"
import { SutechEquipment } from "./sutechEquipment"


const sutechEquipment = new SutechEquipment({
  port: EQUIPMENT_PORT,
  host: EQUIPMENT_HOST,
}, mappingSetting)

const influxClient = new InfluxClient({
  url: INFLUX_URL,
  token: INFLUX_TOKEN,
  org: INFLUX_ORG
})

console.log({
  MACHINE_CODE,
  COMPANY_CODE,
  REPEAT_INTERVAL,
  EQUIPMENT_PORT,
  EQUIPMENT_HOST
})

setInterval(async () => {
  await sutechEquipment.scan()
  const scanResult = await sutechEquipment.getMemory()
  influxClient.write(scanResult)
}, REPEAT_INTERVAL)
