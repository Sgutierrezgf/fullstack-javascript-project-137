import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import resources from './locales/es.js';
import app from './app.js';

i18n
  .init({
    lng: 'es',
    debug: false,
    resources: {
      es: resources,
    },
  })
  .then(() => {
    app(i18n);
  });