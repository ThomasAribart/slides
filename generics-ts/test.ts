import { A } from 'ts-toolbelt'

const marshall = <VALUE extends string | number>(
  value: VALUE
): Marshall<VALUE> => undefined as any

type Marshall<VALUE> = VALUE extends string
  ? { S: VALUE }
  : VALUE extends number
  ? { N: VALUE }
  : VALUE extends object
  ? { M: { [KEY in keyof VALUE]: Marshall<VALUE[KEY]> } }
  : never

const str = marshall('foo')
const assertStr: A.Equals<typeof str, { S: 'foo' }> = 1
const assertAnyStr: A.Equals<
  Marshall<string>,
  { S: string }
> = 1

const num = marshall(42)
const assertNum: A.Equals<typeof num, { N: 42 }> = 1
const assertAnyNum: A.Equals<
  Marshall<number>,
  { N: number }
> = 1

const assertNever: A.Equals<Marshall<never>, never> = 1
const assertUnion: A.Equals<
  Marshall<'foo' | 42>,
  { S: 'foo' } | { N: 42 }
> = 1
