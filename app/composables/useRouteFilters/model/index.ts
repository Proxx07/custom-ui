import type { QueryValue } from '../types';

export const parsers = {
  number: (v: QueryValue): number | undefined => {
    const raw = Array.isArray(v) ? v[0] : v;
    if (raw == null || raw === '') return undefined;
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  },

  boolean: (v: QueryValue): boolean => {
    const raw = Array.isArray(v) ? v[0] : v;
    return raw === '1' || raw === 'true';
  },

  string: (v: QueryValue): string | undefined => {
    const raw = Array.isArray(v) ? v[0] : v;
    return raw == null || raw === '' ? undefined : String(raw);
  },

  array: (v: QueryValue): string[] => {
    if (v == null) return [];
    const arr = Array.isArray(v) ? v : [v];
    return arr.filter((x): x is string => x != null && x !== '');
  },
} as const;

export const isDefault = (value: unknown, def: unknown): boolean => {
  if (Array.isArray(value)) return value.length === 0;
  return value === def || value === undefined || value === null;
};

export const cloneDefault = <T>(def: T): T => {
  if (Array.isArray(def)) return [...def] as T;
  if (def && typeof def === 'object') return { ...def } as T;
  return def;
};
