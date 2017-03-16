# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :emoji_map, EmojiMap.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NHYS388ckeUZtFJ1W/uS9Yv7jPKaCGJ0SM4pK99gMPNSerqSVSqm8NUpT/EpYEPU",
  render_errors: [view: EmojiMap.ErrorView, accepts: ~w(html json)],
  pubsub: [name: EmojiMap.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configure mix_docker
#config :mix_docker, image: "ospaarmann/emoji_map_backend"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
