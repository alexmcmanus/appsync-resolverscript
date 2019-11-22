import { createVelocityVariable, DynamicVelocityVariable } from './VelocityVariable'

export class UnitRequestContext {
  readonly args: DynamicVelocityVariable

  constructor () {
    this.args = createVelocityVariable(['context', 'args'])
  }
}
