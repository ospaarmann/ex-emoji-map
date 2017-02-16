# EmojiMap 😀🙃😘

This is a just for fun project to illustrate the power of Elixir. Specifically of GenStage together with Websockets in the form of Phoenix Channels. This app consists of two parts. A backend written in Elixir and an Angular 2 frontend. Angular 2 is surely an overkill here but I just wanted to illustrate how to wire them together via Phoenix Sockets.

If you have questions please don't hesitate to reach out to me. Please also just fork the repo and do with it whatever you want. The purpose here is learning. I took heavy inspiration from the documentation and from some blog posts. I mention the sources at the bottom. Thanks!

## Getting Started
### Elixir Backend
There are a couple of things you have to do to get this baby rolling.

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

You should now be good to go. Give it a test with

```shell
$ iex -S mix phoenix.server

# Then in the Elixir console (This is just a module + function to start things off):

iex> EmojiMap.Go.go

# And you should see Emojis plus GPS coordinates pop up:

{#PID<0.344.0>, %{coordinates: "-72.10207296,-36.60767116", text: "☕"}, :ok}
{#PID<0.343.0>, %{coordinates: "-72.10207296,-36.60767116", text: "☕"}, :ok}
{#PID<0.344.0>, %{coordinates: "7.37148349,53.22267175", text: "💖"}, :ok}
{#PID<0.343.0>, %{coordinates: "7.37148349,53.22267175", text: "💖"}, :ok}
{#PID<0.344.0>, %{coordinates: "-6.16206674,53.39156607", text: "⚽"}, :ok}
{#PID<0.343.0>, %{coordinates: "-6.16206674,53.39156607", text: "⚽"}, :ok}
{#PID<0.344.0>, %{coordinates: "-51.92907,-23.45233", text: "💄"}, :ok}
{#PID<0.343.0>, %{coordinates: "-51.92907,-23.45233", text: "💄"}, :ok}
```

More to come. This is only the very first part. We now wire it up with the frontend and make the Emojis pop up the map.

## References
### Elixir GenStage
  * [Announcing GenStage](elixir-lang.org/blog/2016/07/14/announcing-genstage/)
  * [Great article explaining Elixir's GenStage by Mario Flach](https://almightycouch.org/blog/reactive-tweets-elixir-genstage/)
  * [GenStage Docs](https://hexdocs.pm/gen_stage/GenStage.html)
  * [Example on storing demand and events](https://github.com/elixir-lang/gen_stage/blob/master/examples/gen_event.exs#L4)
  * [Erlang Queue Docs (used in the TweetBroadcaster module)](http://erlang.org/doc/man/queue.html)

### Angular 2
  


## License
MIT
