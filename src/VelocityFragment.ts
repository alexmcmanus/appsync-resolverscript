import { AnyType } from './velocity-types'

export class VelocityFragment<T = AnyType> {
  readonly fragment: string
  readonly _velocityType: T[]

  constructor (fragment: string) {
    this.fragment = fragment
    this._velocityType = []
  }

  bypassJSON (): string {
    return `${this.fragment}`
  }
}

export const vtl = <T = AnyType>(strings: TemplateStringsArray, ...keys: unknown[]): VelocityFragment<T> => {
  return new VelocityFragment(
    strings.map((string, index) => `${string}${index < keys.length ? keys[index] : ''}`).join('')
  )
}
