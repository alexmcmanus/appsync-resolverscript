import { createVelocityVariable, DynamicVelocityVariable } from './VelocityVariable'
import { UnitRequestContext } from './UnitRequestContext'

export class UnitResponseContext extends UnitRequestContext {
  readonly result: DynamicVelocityVariable

  constructor () {
    super()
    this.result = createVelocityVariable(['context', 'result'])
  }
}
