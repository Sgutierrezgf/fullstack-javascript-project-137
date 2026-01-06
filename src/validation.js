import * as yup from 'yup';

yup.setLocale({
  string: {
    url: 'errors.invalidUrl',
  },
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.duplicate',
  },
});

export const validateUrl = (url, feeds) => {
  const schema = yup
    .string()
    .required()
    .url()
    .notOneOf(feeds);

  return schema.validate(url);
};