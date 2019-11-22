import { stringify } from './utils/stringify'
import { VelocityContext } from './VelocityContext'

interface AnyVariable {
  [key: string]: unknown
}

export interface ResolverTemplate {
  requestTemplate: string
  responseTemplate: string
}

type MappingFn<T extends VelocityContext> = (velocityContext: T) => unknown
type MappingPrimitive = string | object | number | boolean
export type Mapping<T extends VelocityContext> = MappingFn<T> | MappingPrimitive | MappingPrimitive[]

export class ResolverTemplateBuilder<
  RequestContext extends VelocityContext = VelocityContext,
  ResponseContext extends VelocityContext = VelocityContext
> {
  requestContext: RequestContext
  responseContext: ResponseContext
  requestTemplate: string
  responseTemplate: string

  constructor (requestContext: RequestContext, responseContext: ResponseContext) {
    this.requestContext = requestContext
    this.responseContext = responseContext
    this.requestTemplate = '{}'
    this.responseTemplate = '$util.toJson($context.result)'
  }

  private readonly resolveTemplateValue = <ContextType extends VelocityContext>(
    templateOrFunction: Mapping<ContextType>,
    context: ContextType
  ): string => {
    const value = typeof templateOrFunction === 'function' ? templateOrFunction(context) : templateOrFunction
    return `${stringify(value, 2)}`
  }

  sendRequest = (request: Mapping<RequestContext>): ResolverTemplateBuilder<RequestContext, ResponseContext> => {
    this.requestTemplate = this.resolveTemplateValue(request, this.requestContext)
    return this
  }

  then = (response: Mapping<ResponseContext>): ResolverTemplateBuilder<RequestContext, ResponseContext> => {
    this.responseTemplate = this.resolveTemplateValue(response, this.responseContext)
    return this
  }
}
