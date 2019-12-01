import { Mapping } from '../ResolverTemplateBuilder'
import { AppSyncVelocityContext } from '../AppSyncVelocityContext'
import { GlobalMappingContext } from '../GlobalMappingContext'

interface DynamoDBKey {
  [key: string]: unknown
}

type DynamoDBFn = (context: AppSyncVelocityContext<GlobalMappingContext>) => DynamoDBKey

export const getItem = (keyOrFn: DynamoDBKey | DynamoDBFn): Mapping<AppSyncVelocityContext<GlobalMappingContext>> => {
  const velocityContext = new AppSyncVelocityContext(new GlobalMappingContext())
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
