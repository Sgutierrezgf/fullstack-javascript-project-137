import onChange from 'on-change';
import uniqueId from 'lodash/uniqueId.js';
import { validateUrl } from './validation.js';
import parseRss from './parser.js';
import { fetchRss } from './requests.js';
import initView from './view.js';
import startUpdater from './updater.js';

export default (i18n) => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.rss-input'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    feedback: document.querySelector('.feedback'),
  };

  const state = {
    form: {
      status: 'idle',
      error: null,
    },
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, initView(elements, i18n));

  
  startUpdater(watchedState);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = elements.input.value.trim();

    validateUrl(url, state.feeds.map((f) => f.url))
      .then(() => {
        watchedState.form.status = 'loading';
        return fetchRss(url);
      })
      .then(parseRss)
      .then(({ feed, posts }) => {
        const feedId = uniqueId();

        watchedState.feeds.unshift({ ...feed, url, id: feedId });

        watchedState.posts.unshift(
          ...posts.map((post) => ({
            ...post,
            id: uniqueId(),
            feedId,
          }))
        );

        watchedState.form.status = 'success';
        watchedState.form.error = null;
      })
      .catch((error) => {
        watchedState.form.status = 'error';

        if (error.isAxiosError) {
          watchedState.form.error = 'errors.network';
        } else {
          watchedState.form.error = error.message || 'errors.unknown';
        }
      });
  });
};
