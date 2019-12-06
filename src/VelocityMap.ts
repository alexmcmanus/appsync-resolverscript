import { VelocityVariable } from './VelocityVariable'
import { AnyType } from './velocity-types'

export interface VelocityMap {
  [key: string]: VelocityMap & VelocityVariable<AnyType>
}

const mapProxyHandler: ProxyHandler<VelocityVariable> = {
  get: function (target: VelocityVariable, prop: string, receiver: unknown): unknown {
    if (prop in target) {
      return Reflect.get(target, prop, receiver)
    } else {
      return new Proxy(new VelocityVariable(prop, target), mapProxyHandler)
    }
  }
}

export const createVelocityMap = (
  name: string,
  parent?: VelocityVariable<unknown>
): VelocityMap & VelocityVariable<object> => {
  return (new Proxy(new VelocityVariable(name, parent), mapProxyHandler) as unknown) as VelocityMap &
    VelocityVariable<object>
}
