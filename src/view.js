const renderFeeds = (feeds, container) => {
  container.innerHTML = '';
  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    container.append(li);
  });
};

const renderPosts = (posts, container) => {
  container.innerHTML = '';
  posts.forEach(({ title, link }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link;
    a.textContent = title;
    a.target = '_blank';
    li.append(a);
    container.append(li);
  });
};

export default (elements, i18n) => (path, value, prev) => {
  switch (path) {
    case 'feeds':
      renderFeeds(value, elements.feeds);
      break;

    case 'posts':
      renderPosts(value, elements.posts);
      break;

    case 'form.status':
      if (value === 'loading') {
        elements.feedback.textContent = i18n.t('form.loading');
      }
      if (value === 'success') {
        elements.input.value = '';
        elements.input.focus();
        elements.feedback.textContent = i18n.t('form.success');
      }
      break;

    case 'form.error':
      elements.feedback.textContent = i18n.t(value);
      break;

    default:
      break;
  }
};
