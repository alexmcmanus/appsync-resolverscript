import { stringify } from './utils/stringify'
import { vtl, VelocityFragment } from './VelocityFragment'
import { DynamoDB } from './DynamoDb'

export class AppSyncUtil {
  dynamodb = new DynamoDB()

  toJson = (value: unknown): VelocityFragment => {
    return vtl`$util.toJson(${stringify(value)})`
  }
}
