import type { A } from 'ts-toolbelt'

const marshall = <VALUE extends string | number>(
  value: VALUE
): Marshall<VALUE> => undefined as any // We don't care about that

type Marshall<VALUE> = unknown // TODO

const str = marshall('foo')
const assertStr: A.Equals<typeof str, { S: 'foo' }> = 1

const num = marshall(42)
const assertNum: A.Equals<typeof num, { N: 42 }> = 1
