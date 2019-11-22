export interface DynamicVelocityVariable {
  [key: string]: DynamicVelocityVariable
}

export class VelocityVariable {
  [key: string]: unknown

  readonly path: string[]

  constructor (path: string | string[]) {
    this.path = Array.isArray(path) ? path : [path]
  }

  bypassJSON (): string {
    return `$${this.path.join('.')}`
  }
}

const variableProxyHandler: ProxyHandler<VelocityVariable> = {
  get: function (target: VelocityVariable, prop: string, receiver: unknown): unknown {
    if (prop in target) {
      return Reflect.get(target, prop, receiver)
    } else {
      const path = target.path ? [...target.path, prop] : [prop]
      return new Proxy(new VelocityVariable(path), variableProxyHandler)
    }
  }
}

export const createVelocityVariable = (path: string | string[]): DynamicVelocityVariable => {
  return new Proxy(new VelocityVariable(path), variableProxyHandler) as DynamicVelocityVariable
}
