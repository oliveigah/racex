defmodule Racex.Repo do
  use Ecto.Repo,
    otp_app: :racex,
    adapter: Ecto.Adapters.Postgres
end
