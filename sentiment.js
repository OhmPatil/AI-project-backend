const { SentimentAnalyzer, PorterStemmer, WordTokenizer } = require("natural");
const { removeStopwords } = require("stopword");

function getSentiment(text) {
  const cleanedText = text.replace(/[^a-zA-Z\s]+/g, "");

  const tokenizer = new WordTokenizer();
  const tokenizedText = tokenizer.tokenize(cleanedText);

  const filteredText = removeStopwords(tokenizedText);

  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  let result = analyzer.getSentiment(filteredText);
  result = result.toFixed(2);

  // console.log(result);
  return parseFloat(result);
  // return cleanedText
}

module.exports = { getSentiment };
