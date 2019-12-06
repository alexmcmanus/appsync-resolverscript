import { AnyType } from './velocity-types'

export class VelocityVariable<T = AnyType> {
  readonly parent?: VelocityVariable<unknown>
  readonly name: string
  readonly _velocityType: T[]

  constructor (name: string, parent?: VelocityVariable<unknown>) {
    this.name = name
    this.parent = parent
    this._velocityType = []
  }

  get path (): string {
    return this.parent ? `${this.parent.path}.${this.name}` : this.name
  }

  bypassJSON (): string {
    return `$${this.path}`
  }
}
