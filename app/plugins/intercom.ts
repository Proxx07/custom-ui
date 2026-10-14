import type { IUser } from '@/composables/useUser';

export default defineNuxtPlugin({
  dependsOn: ['toast'],
  setup() {
    const { $toast } = useNuxtApp();

    let instance: typeof import('@intercom/messenger-js-sdk') | undefined;
    const isOpened = ref<boolean>(false);
    const isInitializing = ref<boolean>(false);
    const isError = ref<boolean>(false);

    const init = async (user?: IUser) => {
      if (instance || isInitializing.value) return;
      isError.value = false;

      try {
        isInitializing.value = true;
        instance = await import('@intercom/messenger-js-sdk');

        instance.default({
          app_id: 'tf6smsek',
          hide_default_launcher: true,
          ...(user
            ? {
              user_id: String(user.id),
              name: user.name,
              email: user.email ?? undefined,
            }
            : {}),
        });

        instance?.onShow(() => {
          isOpened.value = true;
          isInitializing.value = false;
        });

        instance?.onHide(() => {
          isOpened.value = false;
        });
      }

      catch {
        $toast.error('Failed to load online chat \n Please try later.');
        isError.value = true;
        isInitializing.value = false;
      }
    };

    const openChat = async (user?: IUser) => {
      if (!instance) await init(user);
      if (isOpened.value) {
        instance?.hide();
      }
      else {
        instance?.show();
      }
    };

    return {
      provide: {
        chat: reactive({
          isError,
          isOpened,
          isInitializing,
          open: openChat,
        }),
      },
    };
  },
});
