export const useDrawersStore = defineStore('drawers', () => {
  const asideDrawer = ref(false);
  const showAsideDrawer = () => {
    asideDrawer.value = true;
  };
  const hideAsideDrawer = () => {
    asideDrawer.value = false;
  };

  return {
    asideDrawer,
    showAsideDrawer,
    hideAsideDrawer,
  };
});
