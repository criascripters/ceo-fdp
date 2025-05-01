const environments = ['dev', 'prod'] as const
export type IEnvironment = (typeof environments)[number]

export function isEnvironment(value: unknown): value is IEnvironment {
  return typeof value === 'string' && environments.some((env) => env === value)
}
