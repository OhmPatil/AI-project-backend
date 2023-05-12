// const Sentiment = require("sentiment");
// const sentiment = new Sentiment();
// const spawn = require("child_process").spawn;
const express = require("express");
const cors = require("cors");
const { getSentiment } = require("./sentiment");
const { fetchResults } = require("./fetch");

// Initializing app
const app = express();
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("Server is up! 🤙");
});

// Create /predict route
let headlines;
app.get("/predict/:subreddit", async (req, res) => {
  console.log("Subreddit", req.params.subreddit);

  // const pythonProcess = spawn('python',["test.py", `${req.params.subreddit}`]);
  // pythonProcess.stdout.on('data', async (data) => {
  headlines = await fetchResults(req.params.subreddit);
  console.log(await headlines);

  let results = [];
  headlines.forEach((headline) => {
    // sentimentScore = sentiment.analyze(headline);
    let sentimentScore = getSentiment(headline);
    results.push(sentimentScore);
  });
  console.log(results);
  res.json({ headlines: headlines, results: results }).status(200);
  // })
});

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server running");
});
