self.addEventListener('install', event => {
  // eslint-disable-next-line no-console
  console.log('Service worker installed');
});

self.addEventListener('fetch', event => {
  // eslint-disable-next-line no-useless-return
  return;
});
