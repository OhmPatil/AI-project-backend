const express = require("express");
const cors = require("cors");
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const {getSentiment} = require('./sentiment')
const spawn = require("child_process").spawn;
const {fetchResults} = require("./main")

// Initializing app
const app = express();
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("Server is up! 🤙");
});


// Create /predict route
let pythonResponse
app.get("/predict/:subreddit", async (req, res) => {
    console.log("Subreddit", req.params.subreddit);

    // const pythonProcess = spawn('python',["test.py", `${req.params.subreddit}`]);
    // pythonProcess.stdout.on('data', async (data) => {
        pythonResponse = await fetchResults(req.params.subreddit)
        console.log(await pythonResponse);

        let results = [];
        pythonResponse.forEach((headline) => {
          // sentimentScore = sentiment.analyze(getSentiment(headline));
          // sentimentScore = sentiment.analyze(headline);
          let sentimentScore = getSentiment(headline)
          results.push(sentimentScore);
        });
              console.log(results);
        res.json({headlines: pythonResponse, results: results}).status(200)
    // })

})

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server running");
});
