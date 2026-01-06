const renderFeeds = (feeds, container) => {
  container.innerHTML = '';
  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    container.append(li);
  });
};

const renderPosts = (posts, visitedPosts, container) => {
  container.innerHTML = '';

  posts.forEach(({ id, title, link }) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start'
    );

    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.textContent = title;
    a.classList.add(visitedPosts.has(id) ? 'fw-normal' : 'fw-bold');
    a.dataset.id = id;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Vista previa';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#postModal';

    li.append(a, button);
    container.append(li);
  });
};

const renderModal = (post, elements) => {
  if (!post) return;

  elements.modalTitle.textContent = post.title;
  elements.modalBody.textContent = post.description || '';
  elements.modalLink.href = post.link;
};

export default (elements, i18n, state) => (path, value) => {
  switch (path) {
    case 'feeds':
      renderFeeds(value, elements.feeds);
      break;

    case 'posts':
    case 'ui.visitedPosts':
      renderPosts(state.posts, state.ui.visitedPosts, elements.posts);
      break;

    case 'ui.modalPostId': {
      const post = state.posts.find((p) => p.id === value);
      renderModal(post, elements);
      break;
    }

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
