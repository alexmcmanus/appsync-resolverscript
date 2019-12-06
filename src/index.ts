import { ResolverTemplateBuilder, Mapping } from './ResolverTemplateBuilder'
import { UnitRequestContext } from './UnitRequestContext'
import { UnitResponseContext } from './UnitResponseContext'
import * as dynamodb from './operations/dynamodb'
import { AppSyncUtil } from './AppSyncUtil'
import { AppSyncContext } from './AppSyncContext'

export { stringify } from './utils/stringify'
export { VelocityFragment, vtl } from './VelocityFragment'
export { ResolverTemplate, ResolverTemplateBuilder } from './ResolverTemplateBuilder'
export { PulumiResolver } from './PulumiResolver'

export const operations = {
  dynamodb
}

export const context = new AppSyncContext()
export const util = new AppSyncUtil()

export const sendAppSyncRequest = <
  RequestContext extends UnitRequestContext = UnitRequestContext,
  ResponseContext extends UnitResponseContext = UnitResponseContext
>(
  ...requestElements: Array<Mapping<RequestContext>>
): ResolverTemplateBuilder<RequestContext, ResponseContext> => {
  return new ResolverTemplateBuilder().sendRequest(...requestElements)
}

// export const sendPipelineRequest
