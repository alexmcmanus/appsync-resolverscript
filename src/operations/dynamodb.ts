import { Mapping } from '../ResolverTemplateBuilder'
import { VelocityContext } from '../VelocityContext'
import { UnitRequestContext } from '../UnitRequestContext'
import { AppSyncContext } from '../AppSyncContext'

interface DynamoDBKey {
  [key: string]: unknown
}

type DynamoDBFn = <T extends UnitRequestContext>(context: VelocityContext<T>) => DynamoDBKey

export const getItem = <T extends UnitRequestContext = UnitRequestContext>(
  keyOrFn: DynamoDBKey | DynamoDBFn
): Mapping<T> => {
  const velocityContext = new VelocityContext(new AppSyncContext())
  const key = typeof keyOrFn === 'function' ? keyOrFn(velocityContext) : keyOrFn
  const keyLength = Object.keys(key).length
  if (keyLength < 1) {
    throw new Error(`\`key\` must define at least one typed value: ${key}`)
  }
  if (keyLength > 2) {
    throw new Error(`\`key\` must define no more than two typed values: ${key}`)
  }
  return {
    operation: 'GetItem',
    version: '2017-02-28',
    key: velocityContext.util.dynamodb.toDynamoDBJson(key)
  }
}
