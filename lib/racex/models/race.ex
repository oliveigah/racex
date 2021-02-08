defmodule Racex.Game.Race do
  use Ecto.Schema
  import Ecto.Changeset

  schema "races" do
    field :map, :string
    field :laps, :integer
    field :players, :map
    field :result, :map
    belongs_to :owner_id, Racex.Account.User
    timestamps()
  end

  def get_race_creation_form(race, attrs \\ %{}) do
    race
    |> cast(attrs, [:map, :laps])
    |> validate_required([:map, :laps])
    |> validate_length(:laps, min: 3, max: 20)
  end
end
