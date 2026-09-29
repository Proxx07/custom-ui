export const getElementHeight = (el: HTMLElement): number => {
  if (el instanceof HTMLElement) return el.offsetHeight;
  return 0;
};

export const getElementWidth = (el: HTMLElement): number => {
  if (el instanceof HTMLElement) return el.offsetWidth;
  return 0;
};
