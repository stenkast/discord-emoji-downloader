# Discord Emoji Downloader

[![Netlify Status](https://api.netlify.com/api/v1/badges/13f699a3-62a9-4528-a2e7-166fad42d080/deploy-status)](https://app.netlify.com/sites/discord-emoji-downloader/deploys)

A simple tool to help you download all the emojis from a server you got access too..

## How it works

- Open the [Discord website](https://discord.com/app) and login if you aren't already.
- Open the Chrome Dev Tools with the keyboard shortcut `F12`
- Go to the **Network** tab
- Click the **XHR** button to filter to XHR requests only
- Do any action in Discord like **opening a channel**
- Click the **science** request that shows up in the list
- Go to the **Headers** tab
- Find **Authorization** under **Request Headers** and copy your token (make sure you copy the entire token and don't copy any spaces)
- Then just paste that token into the input field, and click "Count" and wait.

![instructions image](/public/authorization.png?raw=true "Instructions Image")
