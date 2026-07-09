import { joinURL } from 'ufo';
import { COOKIE_LOCALE_KEY, DEFAULT_LANGUAGE } from '~~/i18n/constants';

export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const path = event.path.replace(/^\/api\//, 'api/');
  const ln = getCookie(event, COOKIE_LOCALE_KEY) ?? DEFAULT_LANGUAGE;

  const resultPath = path.includes('?') ? `${path}&lang=${ln}` : `${path}?lang=${ln}`;

  const target = joinURL(apiBaseUrl, resultPath);
  Object.assign(event.node.req.headers);
  return proxyRequest(event, target);
});
