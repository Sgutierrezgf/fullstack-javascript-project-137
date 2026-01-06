export default (rss) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rss, 'application/xml');

  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    throw new Error('errors.parse');
  }

  const channel = doc.querySelector('channel');
if (errorNode || !channel) {
  throw new Error('errors.parse');
}

  const feed = {
    title: channel.querySelector('title')?.textContent ?? '',
    description: channel.querySelector('description')?.textContent ?? '',
  };

  const items = channel.querySelectorAll('item');

  const posts = Array.from(items).map((item) => ({
    title: item.querySelector('title')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
  }));

  return { feed, posts };
};
