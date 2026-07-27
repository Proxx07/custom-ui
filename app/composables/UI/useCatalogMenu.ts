import type { DimensionsType } from './types';

export const useCatalogMenu = () => {
  const navWrapper = ref<HTMLDivElement>();

  const setDimensions = (target?: HTMLElement): DimensionsType => {
    const scrollLeft = navWrapper.value?.scrollLeft ?? 0;
    const navWrapperRight = (navWrapper.value?.offsetLeft || 0) + (navWrapper.value?.offsetWidth || 0);
    let xLeft = (target?.offsetLeft || 0) - scrollLeft;
    const subItemsRight = (xLeft + 220);
    if (subItemsRight >= navWrapperRight) xLeft = xLeft - (subItemsRight - navWrapperRight);
    return {
      x: xLeft,
      y: target?.offsetTop || 0,
      w: target?.offsetWidth || 0,
      h: target?.offsetHeight || 0,
    };
  };

  const dimensions = shallowRef<DimensionsType>(setDimensions());

  const childrenWrapper = ref<HTMLDivElement>();

  const hoverHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    dimensions.value = setDimensions(target);
  };

  const resetHandler = () => {
    dimensions.value = setDimensions();
  };

  const { isOutside: isMouseOutsideOfChildWrapper } = useMouseInElement(childrenWrapper);

  return {
    navWrapper,
    dimensions,
    childrenWrapper,
    isMouseOutsideOfChildWrapper,
    hoverHandler,
    resetHandler,
  };
};
