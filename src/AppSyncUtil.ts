import { stringify } from './utils/stringify'
import { vtl, VelocityFragment } from './VelocityFragment'

export class AppSyncUtil {
  toJson = (value: unknown): VelocityFragment => {
    return vtl`$util.toJson(${stringify(value)})`
  }
}
