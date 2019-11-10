export class VelocityFragment {
  fragment: string

  constructor (fragment: string) {
    this.fragment = fragment
  }

  bypassJSON (): string {
    return `${this.fragment}`
  }
}

export const vtl = (strings: TemplateStringsArray, ...keys: unknown[]): VelocityFragment => {
  return new VelocityFragment(
    strings.map((string, index) => `${string}${index < keys.length ? keys[index] : ''}`).join('')
  )
}
