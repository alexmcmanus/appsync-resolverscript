import { stringify } from './utils/stringify'
import { VelocityContext } from './VelocityContext'
import { UnitRequestContext } from './UnitRequestContext'
import { UnitResponseContext } from './UnitResponseContext'
import { AppSyncContext } from './AppSyncContext'

interface AnyVariable {
  [key: string]: unknown
}

export interface ResolverTemplate {
  requestTemplate: string
  responseTemplate: string
}

type MappingFn<T extends UnitRequestContext> = (velocityContext: VelocityContext<T>) => unknown
type MappingPrimitive = string | object | number | boolean
export type Mapping<T extends UnitRequestContext> = MappingFn<T> | MappingPrimitive | MappingPrimitive[]

export class ResolverTemplateBuilder<
  RequestContext extends UnitRequestContext = UnitRequestContext,
  ResponseContext extends UnitResponseContext = UnitResponseContext
> {
  requestTemplate: string
  responseTemplate: string
  velocityContext = new VelocityContext(new AppSyncContext())

  constructor () {
    this.requestTemplate = '{}'
    this.responseTemplate = '$util.toJson($context.result)'
  }

  private readonly resolveTemplateValue = <T extends UnitRequestContext>(templateOrFunction: Mapping<T>): string => {
    const value =
      typeof templateOrFunction === 'function'
        ? templateOrFunction((this.velocityContext as unknown) as VelocityContext<T>)
        : templateOrFunction
    return `${stringify(value, 2)}`
  }

  sendRequest = (
    ...requestElements: Array<Mapping<RequestContext>>
  ): ResolverTemplateBuilder<RequestContext, ResponseContext> => {
    this.requestTemplate = requestElements.map(request => this.resolveTemplateValue(request)).join('\n')
    return this
  }

  then = (
    ...responseElements: Array<Mapping<ResponseContext>>
  ): ResolverTemplateBuilder<RequestContext, ResponseContext> => {
    this.responseTemplate = responseElements.map(response => this.resolveTemplateValue(response)).join('\n')
    return this
  }
}
