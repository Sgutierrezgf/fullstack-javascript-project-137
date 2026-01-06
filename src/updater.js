import { fetchRss } from './requests.js';
import parseRss from './parser.js';

const TIMEOUT = 5000;

export default (state) => {
  const update = () => {
    const promises = state.feeds.map((feed) =>
      fetchRss(feed.url)
        .then(parseRss)
        .then(({ posts }) => {
          const existingLinks = state.posts
            .filter((p) => p.feedId === feed.id)
            .map((p) => p.link);

          const newPosts = posts
            .filter((post) => !existingLinks.includes(post.link))
            .map((post) => ({
              ...post,
              feedId: feed.id,
            }));

          state.posts.unshift(...newPosts);
        })
        .catch(() => {})
    );

    Promise.all(promises).finally(() => {
      setTimeout(update, TIMEOUT);
    });
  };

  update();
};
