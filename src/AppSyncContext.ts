import { UnitResponseContext } from './UnitResponseContext'
import { UnitRequestContext } from './UnitRequestContext'
import { VelocityMap, createVelocityMap } from './VelocityMap'
import { Identity } from './Identity'
import { VelocityVariable } from './VelocityVariable'

export class AppSyncContext extends VelocityVariable implements UnitRequestContext, UnitResponseContext {
  readonly args: VelocityMap
  readonly result: VelocityMap
  readonly identity: Identity

  constructor () {
    super('context')
    this.identity = new Identity(this)
    this.args = createVelocityMap('args', this)
    this.result = createVelocityMap('result', this)
  }
}
