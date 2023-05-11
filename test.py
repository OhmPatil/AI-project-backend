import sys
import praw
import json

# Initialising PRAW
user_agent = "Python script v1.0 by /u/OhmPatil"
reddit = praw.Reddit(
    client_id="jglMe3SQQQJtNqEBtrmknw",
    client_secret="HGc8yo7aAM0wynsGBVBPT8kaIuQVxg",
    user_agent=user_agent
)

headlines = []
for submission in reddit.subreddit(sys.argv[1]).hot():
    headlines.append(submission.title)

print(json.dumps(headlines))

sys.stdout.flush()
