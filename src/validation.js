import * as yup from 'yup';

export const validateUrl = (url, feeds) => {
  const schema = yup
    .string()
    .required()
    .url()
    .notOneOf(feeds);

  return schema.validate(url);
};
