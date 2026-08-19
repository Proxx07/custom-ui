import type { IUser } from './types';

export const useUser = () => {
  const { $request } = useNuxtApp();
  const user = shallowRef<IUser>();

  const getUser = async () => {
    const { data } = await $request<{ user: IUser }>('/api/user');
    // if (!data?.user) return $toast.error('Authorization failed');
    if (!data?.user) return;
    user.value = data.user;
  };

  return {
    user,
    getUser,
  };
};
