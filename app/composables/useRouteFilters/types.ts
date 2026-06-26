import type { Ref } from 'vue';
import type { parsers } from './model';

export type QueryValue = string | (string | null)[] | null | undefined;

export type ParseKind = keyof typeof parsers;

interface FieldSchema<T> {
  key: string
  parse: ParseKind
  default: T
  serialize?: (v: T) => string | number | (string | number)[]
}

export type Schema = Record<string, FieldSchema<any>>;

export type Refs<S extends Schema> = {
  [K in keyof S]: Ref<S[K]['default']>
};
