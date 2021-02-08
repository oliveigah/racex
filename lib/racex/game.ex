defmodule Racex.Game do
  alias Racex.Repo
  alias Racex.Game.Race

  def get_game_creation_form(%Race{} = race) do
    Race.get_race_creation_form(race)
  end

  def create_race(attrs \\ %{}) do
    %Race{}
    |> Race.get_race_creation_form(attrs)
    |> Repo.insert()
  end
end
