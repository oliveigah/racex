defmodule RacexWeb.GameController do
  use RacexWeb, :controller

  alias Racex.Game
  alias Racex.Game.Race

  plug :authenticate_session when action in [:new, :create]

  def authenticate_session(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_flash(:error, "You must be logged in to access this page")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt()
    end
  end

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def new(conn, _params) do
    changeset = Game.get_game_creation_form(%Race{})
    maps = Game.get_available_maps()
    render(conn, "new.html", changeset: changeset, maps: maps)
  end

  def create(conn, %{"race" => %{"laps" => laps, "map" => map}}) do
    case Game.create_race(%{laps: laps, map: map}) do
      {:ok, _race} ->
        redirect(conn, to: Routes.game_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        maps = Game.get_available_maps()
        render(conn, "new.html", changeset: changeset, maps: maps)
    end
  end
end
