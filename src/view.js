export default (elements, i18n) => (path, value) => {
  if (path === 'form.status') {
    if (value === 'invalid') {
      elements.input.classList.add('is-invalid');
      elements.feedback.textContent = i18n.t(elements.error);
    }

    if (value === 'valid') {
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = i18n.t('form.success');
      elements.input.value = '';
      elements.input.focus();
    }
  }

  if (path === 'form.error') {
    elements.feedback.textContent = i18n.t(value);
  }
};
