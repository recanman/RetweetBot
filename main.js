// made by recanman
const debug = true // if you want debug messages to be sent in the console.
const config = require("./config.json")
const Twit = require("twitter")
const twitter = new Twit(config.authCredentials)

// Type the users you want to retweet here.
const usernames = [
  "recanRBLX",
]
var ids = []

function log(msg) {
  if (debug == true) {
    console.log("[Debug] ~ " + msg)
  }
}

function retweet(username) {
  const query = {from: username, count: config.retweetAmount}

  twitter.get("search/tweets/", query, (err, res) => {
    if (err) {
      return console.log(err)
    }

    log("Got recent tweets for " + username + ".")

    res.statuses.forEach(id => {
      id = id.id_str

      if (ids.includes(id) == false) {
        log("Have not retweeted tweet before, retweeting...")

        twitter.post("statuses/retweet/" + id, {}, (err, res) => {
          if (res) {
            log("Successfully retweeted a tweet for " + username + ".")
          }

          if (err) {
            return console.log(err)
          }
        })
      }
    })
  })
}

usernames.forEach(username => {
  retweet(username)
  log("Successfully retweeted recent tweets for " + username + ".")
})
