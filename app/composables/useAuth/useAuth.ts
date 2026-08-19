import { setSteamAuthLink } from './model';

export const useAuth = () => {
  const route = useRoute();
  const router = useRouter();
  const requestUrl = useRequestURL();

  const { locale } = useI18n();

  const getSteamAuthLink = () => {
    const resolvedRoute = router.resolve(route);
    const url = new URL(resolvedRoute.href, requestUrl.origin).href;
    return setSteamAuthLink(url, locale.value);
  };

  return {
    getSteamAuthLink,
  };
};
