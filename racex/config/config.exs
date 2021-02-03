# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :racex,
  ecto_repos: [Racex.Repo]

# Configures the endpoint
config :racex, RacexWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "y8qdkwm/8XoLnC1Vh8NUDdh2Kdn9yt4T0eJcUBLcAsu3XUW1tKGb1m78TxrU0S3Q",
  render_errors: [view: RacexWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Racex.PubSub,
  live_view: [signing_salt: "EXSZ7Pyj"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
