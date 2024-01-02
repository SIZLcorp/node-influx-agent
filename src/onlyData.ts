import { REPEAT_INTERVAL, EQUIPMENT_PORT, EQUIPMENT_HOST } from './env'
import * as env from './env'
import { mappingSetting } from './setting'
import { SutechEquipment } from './sutechEquipment'
import Debug from 'debug'
const debug = Debug('su-agent')

const sutechEquipment = new SutechEquipment({
  port: EQUIPMENT_PORT,
  host: EQUIPMENT_HOST,
}, mappingSetting)

debug(env)

setInterval(async () => {
  await sutechEquipment.scan()
  const scanResult = await sutechEquipment.getMemory()
  debug(scanResult)
}, REPEAT_INTERVAL)