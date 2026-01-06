import axios from 'axios';

const buildProxyUrl = (url) => {
  const proxy = new URL('https://allorigins.hexlet.app/get');
  proxy.searchParams.set('disableCache', 'true');
  proxy.searchParams.set('url', url);
  return proxy.toString();
};

export const fetchRss = (url) =>
  axios
    .get(buildProxyUrl(url))
    .then((response) => response.data.contents);
