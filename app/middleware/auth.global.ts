import { useUserStore } from '@/store/userStore';

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();
  if (userStore.user) return true;
  await userStore.getUser();
  if (userStore.user) return true;
  return true;
});
