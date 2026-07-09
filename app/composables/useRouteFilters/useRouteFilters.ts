import type { LocationQueryRaw } from 'vue-router';
import type { Refs, Schema } from './types';
import { cloneDefault, isDefault, parsers } from './model';

export const useRouteFilters = <S extends Schema>(schema: S, writeToRouteDebounce?: number) => {
  const route = useRoute();
  const router = useRouter();

  const DEBOUNCE_TIME = writeToRouteDebounce || 350;

  const parseFromRoute = (name: keyof S) => {
    const field = schema[name]!;
    const parsed = parsers[field.parse](route.query[field.key]);
    return parsed === undefined ? cloneDefault(field.default) : parsed;
  };

  const refs = {} as Refs<S>;

  for (const name in schema) {
    refs[name] = ref(parseFromRoute(name)) as any;
  }

  const query = computed<LocationQueryRaw>(() => {
    const result: LocationQueryRaw = {};
    for (const name in schema) {
      const field = schema[name]!;
      const value = refs[name].value;
      if (isDefault(value, field.default)) continue;
      result[field.key] = (field.serialize ? field.serialize(value) : value) as LocationQueryRaw[string];
    }
    return result;
  });

  const writeToRoute = useDebounceFn(() => {
    router.replace({
      name: router.currentRoute.value.name,
      params: router.currentRoute.value.params,
      query: { ...query.value },
    });
  }, DEBOUNCE_TIME);

  watch(query, writeToRoute, { flush: 'post' });

  const resetField = (name: keyof S) => {
    const field = schema[name];
    if (!field) return;
    refs[name].value = cloneDefault(field.default);
  };

  const reset = () => {
    for (const name in schema) {
      resetField(name as keyof S);
    }
  };

  return { ...refs, query, reset, resetField, writeToRoute };
};
