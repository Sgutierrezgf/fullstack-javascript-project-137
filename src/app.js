import onChange from 'on-change';
import { validateUrl } from './validation.js';
import initView from './view.js';

export default (i18n) => {
  const state = {
    form: {
      status: 'idle', 
      error: null,   
    },
    feeds: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.rss-input'),
    feedback: document.querySelector('.feedback'),
  };

  const watchedState = onChange(state, initView(elements, i18n));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = elements.input.value.trim();

    validateUrl(url, state.feeds)
      .then(() => {
        watchedState.feeds.push(url);
        watchedState.form.status = 'valid';
        watchedState.form.error = null;
      })
      .catch((error) => {
        watchedState.form.status = 'invalid';
        watchedState.form.error = error.message; // 👈 código
      });
  });
};
