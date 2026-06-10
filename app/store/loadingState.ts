export const useLoaderStore = defineStore('loader', () => {
  const [isLoading, toggleIsLoading] = useToggle();

  return { isLoading, toggleIsLoading };
});
