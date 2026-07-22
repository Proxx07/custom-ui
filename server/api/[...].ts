import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const { apiBaseUrl } = useRuntimeConfig();

  const path = event.path.replace(/^\/api\//, 'api/');
  // const ln = getCookie(event, COOKIE_LOCALE_KEY) ?? DEFAULT_LANGUAGE;
  const ln = getHeader(event, 'Lang');

  const resultPath = path.includes('?') ? `${path}&lang=${ln}` : `${path}?lang=${ln}`;

  const target = joinURL(apiBaseUrl, resultPath);
  return proxyRequest(event, target);
});
