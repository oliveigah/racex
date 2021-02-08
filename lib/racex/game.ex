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

  def get_available_maps() do
    [
      %{
        name: "square",
        thumbnail: "/images/maps/square.png"
      },
      %{
        name: "circle",
        thumbnail: "/images/maps/circle.png"
      },
      %{
        name: "eight",
        thumbnail: "/images/maps/eight.png"
      }
    ]
  end
end
