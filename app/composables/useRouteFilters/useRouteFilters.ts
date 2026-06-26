import type { LocationQueryRaw } from 'vue-router';
import type { Refs, Schema } from './types';
import { cloneDefault, isDefault, parsers } from './model';

export const useRouteFilters = <S extends Schema>(schema: S) => {
  const route = useRoute();
  const router = useRouter();

  const refs = {} as Refs<S>;
  for (const name in schema) {
    const field = schema[name]!;
    const parsed = parsers[field.parse](route.query[field.key]);
    refs[name] = ref(parsed === undefined ? cloneDefault(field.default) : parsed) as any;
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
  }, 300);

  watch(query, writeToRoute, { flush: 'post' });

  const reset = () => {
    for (const name in schema) {
      refs[name].value = cloneDefault(schema[name]?.default);
    }
  };

  return { ...refs, query, reset };
};
