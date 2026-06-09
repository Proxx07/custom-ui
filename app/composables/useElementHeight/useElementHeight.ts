import type { IEmit, IProps } from './types';

export const useElementHeight = (props: IProps, emit: IEmit) => {
  const element = ref<HTMLElement>();

  onMounted(() => {
    emit('update:height', element.value?.offsetHeight || 0);
  });

  return {
    element,
  };
};
