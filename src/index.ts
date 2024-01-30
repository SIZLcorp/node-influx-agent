import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } from './env'
import * as env from './env'
import { InfluxClient } from './influxClient'
import { mappingSetting } from './setting'
import { SutechEquipment } from './sutechEquipment'
import Debug from 'debug'
import { isInternetConnected } from './sync/isInternetConnected'
import { createLog, deleteLog, getNotSyncedData } from './localDB/localDB.repository'
import { init } from './localDB/models/common'

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

let isInitialized = false

async function main() {
  await init()
  isInitialized = true
}

main()

setInterval(async () => {
  if (!isInitialized) {
    return
  }
  await sutechEquipment.scan()
  const scanResult = await sutechEquipment.getMemory()
  if (scanResult) {
    if (await isInternetConnected()) {
      try {
        await influxClient.write(scanResult)
      } catch (error) {
        // 인터넷에 연결된것으로 확인되더라도 실패한다면 로컬 DB에 저장
        await createLog({ log: scanResult })
      }
    } else {
      debug('인터넷 연결 안됨!')
      await createLog({ log: scanResult })
    }
  }
}, REPEAT_INTERVAL)

setInterval(async () => {
  if (!isInitialized) {
    return
  }

  if (await isInternetConnected()) {
    const logs = await getNotSyncedData()
    if (logs.length) {
      debug(`인터넷 연결됨 ${logs.length} 건 재전송 시도`)
    }

    for (const log of logs) {
      try {
        await influxClient.write(log.log).then(async () => {
          await deleteLog(log.id)
          debug('1건 재전송 완료')
        })
      } catch (error) {
        // 뭔가 문제가 있어서 influxDB에 저장이 안되면 다음번에 다시 시도
        debug(error)
      }
    }
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