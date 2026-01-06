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

    // modal
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalLink: document.querySelector('.full-article'),
  };

  const state = {
    form: {
      status: 'idle',
      error: null,
    },
    feeds: [],
    posts: [],
    ui: {
      visitedPosts: new Set(),
      modalPostId: null,
    },
  };

  const watchedState = onChange(state, initView(elements, i18n, state));

  // 🔁 actualización automática de feeds
  startUpdater(watchedState);

  // 📩 submit RSS
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

  // 👁️ vista previa / marcar leído (delegación)
  elements.posts.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    if (!id) return;

    watchedState.ui.visitedPosts.add(id);
    watchedState.ui.modalPostId = id;
  });
};
