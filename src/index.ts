import { ResolverTemplateBuilder } from './ResolverTemplateBuilder'

export { stringify } from './utils/stringify'
export { VelocityFragment, vtl } from './VelocityFragment'
export { ResolverTemplate, ResolverTemplateBuilder } from './ResolverTemplateBuilder'
export { PulumiResolver } from './PulumiResolver'

export const sendRequest = (request: unknown): ResolverTemplateBuilder => {
  return new ResolverTemplateBuilder().sendRequest(request)
}
