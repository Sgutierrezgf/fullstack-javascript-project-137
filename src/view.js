export default (elements) => (path, value) => {
  if (path === 'form.status') {
    if (value === 'invalid') {
      elements.input.classList.add('is-invalid');
    }

    if (value === 'valid') {
      elements.input.classList.remove('is-invalid');
      elements.input.value = '';
      elements.input.focus();
    }
  }
};
