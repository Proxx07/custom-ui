import { defineStore } from 'pinia';

export const useUserStore = defineStore('user-store', () => {
  const user = ref('');

  const setUser = (value: string) => {
    user.value = value;
  };

  return {
    user, setUser,
  };
});
