import { stringify } from './utils/stringify'
import { VelocityContext } from './VelocityContext'

export interface ResolverTemplate {
  requestTemplate: string
  responseTemplate: string
}

type MappingFn<T extends VelocityContext> = (velocityContext: T) => unknown
type MappingPrimitive = string | object | number | boolean
export type Mapping<T extends VelocityContext> = MappingFn<T> | MappingPrimitive | MappingPrimitive[]

export class ResolverTemplateBuilder<T extends VelocityContext = VelocityContext> {
  velocityTemplate: T
  requestTemplate: string
  responseTemplate: string

  constructor (velocityTemplate: T) {
    this.velocityTemplate = velocityTemplate
    this.requestTemplate = '{}'
    this.responseTemplate = '$util.toJson($context.result)'
  }

  private readonly resolveTemplateValue = (templateOrFunction: Mapping<T>): string => {
    const value =
      typeof templateOrFunction === 'function' ? templateOrFunction(this.velocityTemplate) : templateOrFunction
    return `${stringify(value, 2)}`
  }

  sendRequest = (request: Mapping<T>): ResolverTemplateBuilder<T> => {
    this.requestTemplate = this.resolveTemplateValue(request)
    return this
  }

  then = (response: Mapping<T>): ResolverTemplateBuilder<T> => {
    this.responseTemplate = this.resolveTemplateValue(response)
    return this
  }
}
