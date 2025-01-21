import { F } from 'ts-toolbelt'

export type Marshall<VALUE> = VALUE extends string
  ? { S: VALUE }
  : VALUE extends number
  ? { N: VALUE }
  : VALUE extends unknown[]
  ? number extends VALUE['length']
    ? { L: Marshall<VALUE[number]>[] }
    : { L: MarshallRec<VALUE> }
  : VALUE extends object
  ? { M: { [KEY in keyof VALUE]: Marshall<VALUE[KEY]> } }
  : never

type MarshallRec<
  TUPLE extends unknown[],
  RESULTS extends unknown[] = []
> = TUPLE extends [infer HEAD, ...infer TAIL]
  ? MarshallRec<TAIL, [...RESULTS, Marshall<HEAD>]>
  : RESULTS

export const marshall = <VALUE>(
  value: F.Narrow<VALUE>
): Marshall<VALUE> => undefined as any
