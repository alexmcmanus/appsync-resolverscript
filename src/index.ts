import { ResolverTemplateBuilder, Mapping } from './ResolverTemplateBuilder'
import { AppSyncVelocityContext } from './AppSyncVelocityContext'

export { stringify } from './utils/stringify'
export { VelocityFragment, vtl } from './VelocityFragment'
export { ResolverTemplate, ResolverTemplateBuilder } from './ResolverTemplateBuilder'
export { PulumiResolver } from './PulumiResolver'

export const sendAppSyncRequest = (
  request: Mapping<AppSyncVelocityContext>
): ResolverTemplateBuilder<AppSyncVelocityContext> => {
  return new ResolverTemplateBuilder(new AppSyncVelocityContext()).sendRequest(request)
}
