import { A } from 'ts-toolbelt'

import { Marshall, marshall } from './3-solution'

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

const map = marshall({ foo: 42 })
const assertMap: A.Equals<
  typeof map,
  { M: { foo: Marshall<42> } }
> = 1

const tuple = marshall(['foo', 42])
const assertTuple: A.Equals<
  typeof tuple,
  { L: [Marshall<'foo'>, Marshall<42>] }
> = 1

type test = Marshall<string[]>
const assertArray: A.Equals<
  Marshall<string[]>,
  { L: Marshall<string>[] }
> = 1
