# EmojiMap 😀🙃😘
## See it in action
![emoji-gif](https://cloud.githubusercontent.com/assets/308086/24044569/2319964a-0b1c-11e7-809b-a0820a0c0550.gif)

[Online demo can be found here.](http://emojimap.ospaarmann.com)
## About this project
A simple map that shows all geotagged tweets worldwide and in real-time that contain an emoji. It is really fast. Try for yourself by tweeting anything with an emoji and a location and see the tweet pop up on the map in milliseconds. You can see the whole tweet by clicking on the emoji.

[I published an article about the project on Medium. You can read a bit more about it there.](https://medium.com/@ospaarmann/building-a-twitter-emoji-map-with-elixirs-genstage-phoenix-channels-and-angular-134319061b8a)

I built this web app as a weekend project to illustrate the power of Elixir. Specifically of GenStage together with WebSockets in the form of Phoenix Channels. I recommend starting off with reading this blog post: [Announcing GenStage](elixir-lang.org/blog/2016/07/14/announcing-genstage/). What this app basically does is pretty simple: The Elixir backend connects on startup to the Twitter Stream API via the ExTwitter client library. It then filters the stream for all tweets that are geotagged and contain an emoji. These tweets are pushed via a WebSocket or Phoenix Channel to the Angular frontend which draws them as markers on a Mapbox map.

If you have questions please don't hesitate to reach out to me. Please also just fork the repo and do with it whatever you want. The purpose here is learning. I took heavy inspiration from the documentation and from some blog posts. I mention the sources at the bottom. Thanks!

## Getting started
There are a couple of things you have to do to get this baby rolling. I assume that you have installed everything necessary like Elixir/Erlang, NPM and angular-cli.
### Elixir Backend

```shell
# Clone the repo

$ git clone http://github.com/ospaarmann/ex-emoji-map
$ cd ex-emoji-map/backend

# Get dependencies

$ mix deps.get

# Create a file for the environment variables.
# This is just to make your life easier. You can handle them however
# you want and this is only for dev mode locally.

$ touch .env
```

Now open the `.env` file inside the backend folder that you just created with an editor and add your Twitter API Credentials. You have to register an App over at [Twitter](https://apps.twitter.com/) to get the credentials. Your file should look like this afterwards:

```shellshell
export TWITTER_CONSUMER_KEY="YOUR_SECRET_VALUE"
export TWITTER_CONSUMER_SECRET="YOUR_SECRET_VALUE"
export TWITTER_ACCESS_TOKEN="YOUR_SECRET_VALUE"
export TWITTER_ACCESS_TOKEN_SECRET="YOUR_SECRET_VALUE"
```

Now you just have to run `$ source .env` **whenever you open a new terminal window**. Why am I not just writing it directly into config/config.exs or config/dev.exs? To prevent you from accidentally publishing your API keys when you publish a changed version of this code. And because I like this way of doing things.

You should now be good to go. Give it a test with `$ iex -S mix phoenix.server`
### Frontend
There is not so much work to do here. You just need an API key from [Mapbox](http://mapbox.com). Add this to the file `frontend/src/environments/environment.ts`. You can now fire the frontend up:
```shell
$ cd frontend
$ ng serve
```
## References
### General
  * [Article on this project](https://medium.com/@ospaarmann/building-a-twitter-emoji-map-with-elixirs-genstage-phoenix-channels-and-angular-134319061b8a)
### Elixir GenStage
  * [Announcing GenStage](http://elixir-lang.org/blog/2016/07/14/announcing-genstage/)
  * [Great article explaining Elixir's GenStage by Mario Flach](https://almightycouch.org/blog/reactive-tweets-elixir-genstage/)
  * [GenStage Docs](https://hexdocs.pm/gen_stage/GenStage.html)
  * [Example on storing demand and events](https://github.com/elixir-lang/gen_stage/blob/master/examples/gen_event.exs#L4)
  * [Erlang Queue Docs (used in the TweetBroadcaster module)](http://erlang.org/doc/man/queue.html)

### Angular
  * [Getting started with Angular](https://angular.io/docs/js/latest/quickstart.html)

### Emojis
  * [Exmoji - Emoji encoding swiss army knife for Elixir/Erlang](https://github.com/mroth/exmoji)

## License
MIT
