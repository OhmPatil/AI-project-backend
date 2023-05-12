const fetch = require("node-fetch");

async function fetchResults(subreddit) {
  let results = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`);
  let data = await results.json();

  let headlines = [];
  data.data.children.forEach((post) => {
    headlines.push(post.data.title);
  });

  // console.log(headlines);
  return headlines;
}

module.exports = { fetchResults };
