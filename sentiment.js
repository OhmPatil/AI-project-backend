const { SentimentAnalyzer, PorterStemmer, WordTokenizer } = require("natural");
const { removeStopwords } = require("stopword");

function getSentiment(text) {
  // Remove special symbols etc
  const cleanedText = text.replace(/[^a-zA-Z\s]+/g, "");

  // Tokenize text
  const tokenizer = new WordTokenizer();
  const tokenizedText = tokenizer.tokenize(cleanedText);

  // Remove stopwords
  const filteredText = removeStopwords(tokenizedText); //Returns array of words(tokens)

  // Analyze
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  let result = analyzer.getSentiment(filteredText);
  result = result.toFixed(2);

  // console.log(result);
  return parseFloat(result);
}

module.exports = { getSentiment };
