import { useUser } from '@/composables/useUser';

export const useUserStore = defineStore('user', () => {
  const { user, getUser } = useUser();

  return {
    user,
    getUser,
  };
});
