import { stringify } from './utils/stringify'

export interface ResolverTemplate {
  requestTemplate: string
  responseTemplate: string
}

export class ResolverTemplateBuilder {
  requestTemplate: string
  responseTemplate: string

  constructor () {
    this.requestTemplate = '{}'
    this.responseTemplate = '$util.toJson($context.result)'
  }

  private readonly resolveTemplateValue = (templateOrFunction: unknown): string => {
    const value = typeof templateOrFunction === 'function' ? templateOrFunction() : templateOrFunction
    return `${stringify(value, 2)}`
  }

  sendRequest = (request: unknown): ResolverTemplateBuilder => {
    this.requestTemplate = this.resolveTemplateValue(request)
    return this
  }

  then = (response: unknown): ResolverTemplateBuilder => {
    this.responseTemplate = this.resolveTemplateValue(response)
    return this
  }
}
