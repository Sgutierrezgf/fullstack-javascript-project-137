import onChange from 'on-change';
import { validateUrl } from './validation.js';
import initView from './view.js';

export default () => {
  const state = {
    form: {
      status: 'idle', 
    },
    feeds: [],
  };

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.rss-input'),
};

  const watchedState = onChange(state, initView(elements));

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
        watchedState.form.error = error.message;
      });
  });
};
