import type { FetchError } from 'ofetch';

export default defineNuxtPlugin({
  dependsOn: ['toast'],
  setup() {
    const { $toast } = useNuxtApp();

    const instance = $fetch.create({
      baseURL: '/',

      onRequest() {
        // options.headers = new Headers(options.headers);
        // const lang = useCookie('lang', { default: () => 'en' });
        // options.headers.set('Lang', lang.value);
      },

      onResponse({ response, options }) {
        if (options.silent || !response.ok) return;
        const data = response._data;
        if (data?.error && typeof data.error === 'string') {
          $toast.error(data.error);
        }
      },

      onResponseError({ response, options }) {
        if (options.silent) return;
        const data = response?._data;
        const message = data && typeof data === 'string'
          ? data
          : (data.msg && typeof data.msg === 'string')
            ? data.msg
            : response?.statusText;

        $toast.error(message);
      },
    });

    const request = async <T = unknown>(...args: Parameters<typeof instance<T>>): Promise<RequestResult<T>> => {
      try {
        const data = await instance<T>(...args);
        return { data, error: null };
      }
      catch (error) {
        return { data: null, error: error as FetchError };
      }
    };

    return {
      provide: { request },
    };
  },
});

// Использование:
// const { $request } = useNuxtApp();
// const { data, error } = await $request<Interface or Type>('/api/endpoint', options);
