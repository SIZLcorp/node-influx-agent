import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } from './env'
import * as env from './env'
import { InfluxClient } from './influxClient'
import { mappingSetting } from './setting'
import { SutechEquipment } from './sutechEquipment'
import Debug from 'debug'
const debug = Debug('su-agent')

const sutechEquipment = new SutechEquipment({
  port: EQUIPMENT_PORT,
  host: EQUIPMENT_HOST,
}, mappingSetting)

const influxClient = new InfluxClient({
  url: INFLUX_URL,
  token: INFLUX_TOKEN,
  org: INFLUX_ORG,
})

debug(env)

setInterval(async () => {
  await sutechEquipment.scan()
  const scanResult = await sutechEquipment.getMemory()
  if (scanResult) {
    await influxClient.write(scanResult)
  }
}, REPEAT_INTERVAL)

// setInterval(() => {
//   const memoryData = process.memoryUsage()
//   const memoryUsage = {
//     rss: `${memoryData.rss / 1024 / 1024} MB`,
//     heapTotal: `${memoryData.heapTotal / 1024 / 1024} MB`,
//     heapUsed: `${memoryData.heapUsed / 1024 / 1024} MB`,
//     external: `${memoryData.external / 1024 / 1024} MB`,
//   }
//   console.log(memoryUsage)
// }, 500)