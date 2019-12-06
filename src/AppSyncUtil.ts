import { stringify } from './utils/stringify'
import { vtl, VelocityFragment } from './VelocityFragment'
import { DynamoDB } from './DynamoDB'
import { VelocityObject, VelocityString, VoidType } from './velocity-types'

export class AppSyncUtil {
  dynamodb = new DynamoDB()

  isList = (value: VelocityObject): VelocityFragment<boolean> => vtl`$util.isList(${stringify(value)})`

  isString = (value: VelocityObject): VelocityFragment<boolean> => vtl`$util.isString(${stringify(value)})`

  isNull = (value: VelocityObject): VelocityFragment<boolean> => vtl`$util.isNull(${stringify(value)})`

  isNullOrEmpty = (value: VelocityString): VelocityFragment<boolean> => vtl`$util.isNullOrEmpty(${stringify(value)})`

  defaultIfNull = (value: VelocityObject, defaultValue: VelocityObject): VelocityObject =>
    vtl`$util.defaultIfNull(${stringify(value)}, ${stringify(defaultValue)})`

  unauthorized = (): VelocityFragment<VoidType> => vtl`$util.unauthorized()`

  toJson = (value: VelocityObject): VelocityFragment<string> => vtl`$util.toJson(${stringify(value)})`
}
