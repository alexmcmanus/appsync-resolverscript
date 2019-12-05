import { stringify } from './utils/stringify'
import { vtl, VelocityFragment } from './VelocityFragment'
import { DynamoDB } from './DynamoDB'

export class AppSyncUtil {
  dynamodb = new DynamoDB()

  isList = (value: unknown): VelocityFragment => vtl`$util.isList(${stringify(value)})`

  isString = (value: unknown): VelocityFragment => vtl`$util.isString(${stringify(value)})`

  isNull = (value: unknown): VelocityFragment => vtl`$util.isNull(${stringify(value)})`

  isNullOrEmpty = (value: unknown): VelocityFragment => vtl`$util.isNullOrEmpty(${stringify(value)})`

  defaultIfNull = (value: unknown, defaultValue: unknown): VelocityFragment =>
    vtl`$util.defaultIfNull(${stringify(value)}, ${stringify(defaultValue)})`

  unauthorized = (): VelocityFragment => vtl`$util.unauthorized()`

  toJson = (value: unknown): VelocityFragment => vtl`$util.toJson(${stringify(value)})`
}
